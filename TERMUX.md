# 📱 Rodando o bygdëall animes pelo Termux (vídeos direto do armazenamento)

Este guia é pra quem quer manter os vídeos guardados no armazenamento do
celular (pasta normal de arquivos, cartão SD, etc.) e servidos por um
mini-servidor local, em vez de depender do armazenamento do navegador
(IndexedDB) ou de um serviço na nuvem (Supabase).

Use isso quando:
- Você quer assistir pelo Wi-Fi de casa em mais de um aparelho (celular, TV,
  notebook) sem subir nada pra internet.
- Os vídeos são grandes demais / muitos demais pra guardar no navegador.
- Você já tem os arquivos organizados numa pasta do celular.

Se você só quer usar no próprio celular, sem complicação nenhuma, o mais
simples continua sendo o upload direto pelo painel admin (ele já salva o
vídeo no armazenamento do navegador via IndexedDB, sem precisar de nada
disso aqui). Este guia é o "próximo nível".

---

## 1. Instalar o Termux e liberar acesso ao armazenamento

1. Instale o **Termux** (recomendado via F-Droid, a versão da Play Store está
   desatualizada): https://f-droid.org/packages/com.termux/
2. Abra o Termux e atualize os pacotes:
   ```bash
   pkg update -y && pkg upgrade -y
   ```
3. Libere o acesso à pasta de arquivos do Android (isso cria uma pasta
   `~/storage` com atalhos pra Downloads, DCIM, Movies etc.):
   ```bash
   termux-setup-storage
   ```
   Confirme a permissão que o Android vai pedir.

## 2. Colocar o projeto e os vídeos na mesma pasta

A forma mais tranquila é servir o **site inteiro** (HTML/CSS/JS) junto com
os vídeos, tudo pelo mesmo servidor local. Isso evita problema de o
navegador bloquear vídeo "http" dentro de uma página "https" (conteúdo
misto), porque tudo vai ser servido do mesmo jeitinho, local mesmo.

```bash
# copia o projeto pra dentro do Termux (ajuste o caminho de origem)
cp -r ~/storage/downloads/bygdeall-animes ~/bygdeall-animes
cd ~/bygdeall-animes

# crie uma pasta pra colocar os vídeos, ex: videos/
mkdir -p videos
# copie ou mova seus arquivos de vídeo pra ela
cp ~/storage/movies/*.mp4 videos/
```

## 3. Instalar um servidor que entende "Range" (necessário pra vídeo)

Servidores simples de arquivo (como `python -m http.server`) não respondem
corretamente quando o player pede um pedaço específico do vídeo (isso é o
que permite adiantar/voltar o vídeo sem esperar carregar tudo de novo).
Por isso, use um destes dois:

**Opção A — Node.js (`http-server`, recomendado):**
```bash
pkg install nodejs -y
npm install -g http-server
cd ~/bygdeall-animes
http-server -p 8080
```

**Opção B — Python com suporte a Range:**
```bash
pkg install python -y
pip install rangehttpserver
cd ~/bygdeall-animes
python -m RangeHTTPServer 8080
```

Qualquer uma das duas deixa o site (e a pasta `videos/`) disponível em:
- `http://127.0.0.1:8080` — se você for abrir no navegador do próprio celular
- `http://SEU_IP_LOCAL:8080` — pra abrir de outro aparelho na mesma rede Wi-Fi

Pra descobrir o IP local do celular:
```bash
ip addr show wlan0 | grep "inet "
```

## 4. Apontar o episódio pro arquivo de vídeo

No painel admin (`admin/index.html`), no campo **"URL do Vídeo"** do
episódio, use o link direto pro arquivo, por exemplo:
```
http://127.0.0.1:8080/videos/episodio-01.mp4
```
(ou o IP da rede, se for assistir de outro aparelho)

## 5. Manter o servidor rodando

O Android tende a "matar" processos em segundo plano pra economizar
bateria. Pra evitar que o servidor pare sozinho:

```bash
termux-wake-lock
```
E nas configurações de bateria do Android, desative a otimização de
bateria especificamente pro app Termux.

Se quiser que o servidor suba sozinho toda vez que abrir o Termux, adicione
o comando de inicialização (`http-server -p 8080` ou o comando da Opção B)
no arquivo `~/.bashrc`.

## Resumo rápido (copiar e colar)

```bash
pkg update -y && pkg upgrade -y
termux-setup-storage
pkg install nodejs -y
npm install -g http-server
cd ~/bygdeall-animes   # pasta do projeto, com uma subpasta videos/
termux-wake-lock
http-server -p 8080
```

Depois é só abrir `http://127.0.0.1:8080` no navegador do celular (ou o
IP local, de outro aparelho) e usar o site normalmente — os vídeos da
pasta `videos/` tocam direto, sem passar por nenhum serviço externo.
