/**
 * bygdëall animes - Armazenamento local de vídeo (IndexedDB)
 * ------------------------------------------------------------
 * Por que isto existe:
 * localStorage tem limite de ~5-10MB no total, então guardar vídeo
 * como base64 ali (o "modo antigo") só funciona pra clipes minúsculos.
 * IndexedDB guarda o arquivo de vídeo como Blob de verdade (binário),
 * sem inflar 33% como base64, e o limite de espaço é muito maior
 * (geralmente uma fatia do espaço livre do disco/celular).
 *
 * Resultado: dá pra escolher um vídeo direto da galeria/armazenamento
 * do celular no painel admin, sem precisar de servidor, Termux,
 * conta na nuvem ou internet. Só funciona no MESMO navegador/aparelho
 * onde o vídeo foi salvo (não sincroniza entre dispositivos sozinho).
 */
const VideoStore = (() => {
  const DB_NAME = "bygdeall_videos";
  const STORE = "videos";
  const VERSION = 1;
  let dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE); // key = id do vídeo, value = { blob, name, size, type, savedAt }
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  // Gera uma chave nova, ex: "idb-1699999999999-a1b2c"
  function newKey() {
    return "idb-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  }

  // Salva um File/Blob. Retorna a "chave" (string) que deve ser guardada
  // no campo `video` do episódio, no formato "idb:CHAVE".
  async function saveVideo(file, existingKey = null) {
    const db = await openDb();
    const key = existingKey || newKey();
    const record = { blob: file, name: file.name, size: file.size, type: file.type, savedAt: Date.now() };
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(record, key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    return "idb:" + key;
  }

  // Recupera o registro { blob, name, size, type } a partir da referência "idb:CHAVE"
  async function getVideo(ref) {
    if (!ref || !ref.startsWith("idb:")) return null;
    const key = ref.slice(4);
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function deleteVideo(ref) {
    if (!ref || !ref.startsWith("idb:")) return;
    const key = ref.slice(4);
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  // Estimativa de espaço usado/disponível (nem todo navegador suporta)
  async function estimateUsage() {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      return { usage, quota };
    }
    return null;
  }

  function isLocalRef(url) {
    return typeof url === "string" && url.startsWith("idb:");
  }

  function formatBytes(bytes) {
    if (!bytes) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb > 1024) return (mb / 1024).toFixed(2) + " GB";
    return mb.toFixed(1) + " MB";
  }

  return { saveVideo, getVideo, deleteVideo, estimateUsage, isLocalRef, formatBytes };
})();
