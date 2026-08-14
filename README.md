# 🎬 bygdëall animes - Plataforma de Streaming

![bygdëall animes](https://img.shields.io/badge/bygdëall animes-Streaming-red)
![PWA](https://img.shields.io/badge/PWA-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Descrição

bygdëall animes é uma plataforma de streaming completa para animes, desenhos e séries. Desenvolvida com tecnologias modernas, oferece uma experiência imersiva e responsiva em todos os dispositivos.

## ✨ Funcionalidades

### 🎯 Principais
- ✅ Design tema escuro moderno
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Banner rotativo com destaque
- ✅ Carrosséis de conteúdo (Lançamentos, Populares, Recomendados)
- ✅ Cards com capas de alta qualidade
- ✅ Pesquisa inteligente em tempo real
- ✅ Sistema de favoritos
- ✅ Continuar assistindo (progresso salvo)

### 👤 Usuário
- ✅ Cadastro e Login
- ✅ Perfil com avatar
- ✅ Histórico de visualização
- ✅ Lista de favoritos
- ✅ Lista "Quero Assistir"

### 🎮 Player
- ✅ HTML5 Player
- ✅ Play/Pause
- ✅ Controle de volume
- ✅ Velocidade de reprodução
- ✅ Tela cheia
- ✅ Barra de progresso
- ✅ Próximo/Anterior episódio

### 📱 PWA (Progressive Web App)
- ✅ Instalável como aplicativo
- ✅ Ícone personalizado
- ✅ Splash Screen
- ✅ Funcionamento offline
- ✅ Cache inteligente

### 🎨 Extras
- ✅ Tema claro/escuro
- ✅ Botão voltar ao topo
- ✅ Animações suaves
- ✅ SEO otimizado
- ✅ Alta performance

## 🎥 Como colocar vídeos nos episódios

No painel admin, o campo de vídeo de cada episódio aceita três formas,
da mais simples pra mais avançada:

1. **Link direto (YouTube, Vimeo, Google Drive ou .mp4 direto)** — cole a
   URL no campo "URL do Vídeo". Mais simples se o conteúdo já está hospedado
   em algum lugar.
2. **Enviar da galeria/armazenamento do aparelho, sem servidor nenhum** —
   use o botão de upload. Sem nada configurado, o arquivo é salvo direto no
   armazenamento do navegador (IndexedDB), aguenta episódios inteiros e
   funciona offline — mas só nesse mesmo navegador/aparelho.
3. **Nuvem própria (Supabase) ou servidor local (Termux)** — pra ter os
   vídeos disponíveis em qualquer aparelho: configure o Supabase na aba
   "Armazenamento de Vídeo" do admin, ou sirva os arquivos direto da pasta
   do celular usando o Termux — veja o passo a passo em **[TERMUX.md](TERMUX.md)**.

## 🚀 Tecnologias

- HTML5
- CSS3 (com variáveis e tema escuro/claro)
- JavaScript (ES6+)
- PWA (Service Worker, Manifest)
- Font Awesome (Ícones)
- Google Fonts (Inter)

## 📁 Estrutura do Projeto

```
bygdeall-animes/
├── index.html          # Página principal (SPA)
├── offline.html         # Página de fallback quando não há internet
├── manifest.json         # Configuração do PWA
├── TERMUX.md             # Guia: servir vídeos direto do armazenamento via Termux
├── admin/
│   └── index.html        # Painel administrativo (títulos, episódios, categorias)
├── css/
│   └── style.css         # Estilos (tema escuro/claro, responsivo)
└── js/
    ├── app.js             # Lógica principal, player, carrosséis, busca
    ├── auth.js             # Login/cadastro (simulado em localStorage)
    ├── video-storage.js    # Armazenamento local de vídeo (IndexedDB)
    └── sw.js               # Service Worker (cache/offline)
```

## ⚠️ Aviso sobre conteúdo

Este projeto é uma base técnica de streaming. Adicione apenas vídeos
próprios ou que você tenha autorização para exibir/distribuir. O
armazenamento local (IndexedDB) e o servidor via Termux descritos aqui
são só formas de guardar/servir arquivos — eles não concedem nenhum
direito sobre o conteúdo em si.

