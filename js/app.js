/**
 * AnimeFlix - Aplicação Principal
 * Gerenciamento de interface, carrosséis, temas e interações
 */

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    API_URL: 'https://api.example.com/animes',
    CACHE_KEY: 'animeflix_cache',
    MAX_ITEMS: 12,
    AUTO_PLAY_INTERVAL: 5000,
    DEBOUNCE_DELAY: 300,
};

// ===== DADOS DE EXEMPLO (Simulando API) =====
// Usados apenas como fallback caso o painel admin ainda não tenha salvo nada
const DEFAULT_ANIME_DATA = [
    {
        id: 1,
        title: 'Demon Slayer: Kimetsu no Yaiba',
        year: 2021,
        genre: 'Ação, Fantasia',
        rating: 9.1,
        episodes: 26,
        status: 'Finalizado',
        studio: 'Ufotable',
        description: 'Um jovem caçador de demônios luta para salvar sua irmã e vingar sua família.',
        image: 'https://picsum.photos/seed/demon/300/450',
        banner: 'https://picsum.photos/seed/demon/1920/800',
        seasons: 2,
        progress: 45,
        isFavorite: false
    },
    {
        id: 2,
        title: 'Attack on Titan',
        year: 2013,
        genre: 'Ação, Drama',
        rating: 9.5,
        episodes: 87,
        status: 'Finalizado',
        studio: 'Wit Studio',
        description: 'Humanidade luta pela sobrevivência contra gigantes devoradores de humanos.',
        image: 'https://picsum.photos/seed/titan/300/450',
        banner: 'https://picsum.photos/seed/titan/1920/800',
        seasons: 4,
        progress: 100,
        isFavorite: true
    },
    {
        id: 3,
        title: 'One Piece',
        year: 1999,
        genre: 'Aventura, Comédia',
        rating: 9.3,
        episodes: 1000,
        status: 'Em andamento',
        studio: 'Toei Animation',
        description: 'Luffy e sua tripulação partem em busca do tesouro lendário One Piece.',
        image: 'https://picsum.photos/seed/onepiece/300/450',
        banner: 'https://picsum.photos/seed/onepiece/1920/800',
        seasons: 20,
        progress: 78,
        isFavorite: true
    },
    {
        id: 4,
        title: 'Naruto Shippuden',
        year: 2007,
        genre: 'Ação, Aventura',
        rating: 9.0,
        episodes: 500,
        status: 'Finalizado',
        studio: 'Pierrot',
        description: 'Naruto busca se tornar Hokage enquanto enfrenta ameaças cada vez maiores.',
        image: 'https://picsum.photos/seed/naruto/300/450',
        banner: 'https://picsum.photos/seed/naruto/1920/800',
        seasons: 20,
        progress: 100,
        isFavorite: false
    },
    {
        id: 5,
        title: 'My Hero Academia',
        year: 2016,
        genre: 'Ação, Comédia',
        rating: 8.8,
        episodes: 113,
        status: 'Em andamento',
        studio: 'Bones',
        description: 'Em um mundo onde 80% da população possui superpoderes, um garoto sem poderes sonha em se tornar um herói.',
        image: 'https://picsum.photos/seed/hero/300/450',
        banner: 'https://picsum.photos/seed/hero/1920/800',
        seasons: 6,
        progress: 67,
        isFavorite: false
    },
    {
        id: 6,
        title: 'Fullmetal Alchemist: Brotherhood',
        year: 2009,
        genre: 'Fantasia, Ação',
        rating: 9.2,
        episodes: 64,
        status: 'Finalizado',
        studio: 'Bones',
        description: 'Dois irmãos buscam a Pedra Filosofal para restaurar seus corpos após uma alquimia proibida.',
        image: 'https://picsum.photos/seed/fma/300/450',
        banner: 'https://picsum.photos/seed/fma/1920/800',
        seasons: 1,
        progress: 0,
        isFavorite: false
    },
    {
        id: 7,
        title: 'Death Note',
        year: 2006,
        genre: 'Suspense, Mistério',
        rating: 9.0,
        episodes: 37,
        status: 'Finalizado',
        studio: 'Madhouse',
        description: 'Um caderno que mata qualquer pessoa cujo nome seja escrito nele cai nas mãos de um genial estudante.',
        image: 'https://picsum.photos/seed/deathnote/300/450',
        banner: 'https://picsum.photos/seed/deathnote/1920/800',
        seasons: 1,
        progress: 0,
        isFavorite: false
    },
    {
        id: 8,
        title: 'Tokyo Ghoul',
        year: 2014,
        genre: 'Suspense, Horror',
        rating: 8.5,
        episodes: 24,
        status: 'Finalizado',
        studio: 'Pierrot',
        description: 'Em um mundo onde ghouls devoram humanos, um jovem se torna meio-ghoul após um acidente.',
        image: 'https://picsum.photos/seed/ghoul/300/450',
        banner: 'https://picsum.photos/seed/ghoul/1920/800',
        seasons: 2,
        progress: 0,
        isFavorite: false
    },
    {
        id: 9,
        title: 'Jujutsu Kaisen',
        year: 2020,
        genre: 'Ação, Fantasia',
        rating: 9.4,
        episodes: 24,
        status: 'Em andamento',
        studio: 'MAPPA',
        description: 'Um estudante se torna um feiticeiro para exorcizar maldições após ingerir um dedo amaldiçoado.',
        image: 'https://picsum.photos/seed/jujutsu/300/450',
        banner: 'https://picsum.photos/seed/jujutsu/1920/800',
        seasons: 2,
        progress: 100,
        isFavorite: true
    },
    {
        id: 10,
        title: 'Spy x Family',
        year: 2022,
        genre: 'Comédia, Ação',
        rating: 9.2,
        episodes: 25,
        status: 'Em andamento',
        studio: 'Wit Studio',
        description: 'Um espião precisa criar uma família falsa para cumprir sua missão, sem saber que sua "filha" é uma telepata e sua "esposa" é uma assassina.',
        image: 'https://picsum.photos/seed/spy/300/450',
        banner: 'https://picsum.photos/seed/spy/1920/800',
        seasons: 2,
        progress: 34,
        isFavorite: false
    },
    {
        id: 11,
        title: 'Chainsaw Man',
        year: 2022,
        genre: 'Ação, Fantasia',
        rating: 9.3,
        episodes: 12,
        status: 'Em andamento',
        studio: 'MAPPA',
        description: 'Um jovem que pode se transformar em um demônio motosserra se junta a uma agência de caçadores de demônios.',
        image: 'https://picsum.photos/seed/chainsaw/300/450',
        banner: 'https://picsum.photos/seed/chainsaw/1920/800',
        seasons: 1,
        progress: 50,
        isFavorite: false
    },
    {
        id: 12,
        title: 'Demon Slayer: Mugen Train',
        year: 2020,
        genre: 'Ação, Fantasia',
        rating: 9.5,
        episodes: 1,
        status: 'Finalizado',
        studio: 'Ufotable',
        description: 'Filme que continua a história de Demon Slayer, com os caçadores enfrentando um demônio em um trem.',
        image: 'https://picsum.photos/seed/mugen/300/450',
        banner: 'https://picsum.photos/seed/mugen/1920/800',
        seasons: 0,
        progress: 0,
        isFavorite: false
    }
];

// ===== CATEGORIAS =====
// Usadas apenas como fallback caso o painel admin ainda não tenha salvo nada
const DEFAULT_CATEGORIES = [
    { name: 'Ação', icon: 'fa-fist-raised', color: '#e50914' },
    { name: 'Aventura', icon: 'fa-compass', color: '#ff6b35' },
    { name: 'Comédia', icon: 'fa-laugh', color: '#f7c948' },
    { name: 'Drama', icon: 'fa-theater-masks', color: '#9b59b6' },
    { name: 'Fantasia', icon: 'fa-dragon', color: '#3498db' },
    { name: 'Romance', icon: 'fa-heart', color: '#e74c3c' },
    { name: 'Sci-Fi', icon: 'fa-rocket', color: '#00b4d8' },
    { name: 'Slice of Life', icon: 'fa-coffee', color: '#6b8c42' },
    { name: 'Esporte', icon: 'fa-basketball-ball', color: '#f39c12' },
    { name: 'Suspense', icon: 'fa-skull', color: '#2c3e50' }
];

// Cores/ícones padrão usados quando uma categoria vem do admin sem essa info
const FALLBACK_CATEGORY_COLORS = ['#e50914', '#ff6b35', '#f7c948', '#9b59b6', '#3498db', '#e74c3c', '#00b4d8', '#6b8c42', '#f39c12', '#2c3e50'];

// ===== INTEGRAÇÃO COM O PAINEL ADMIN =====
// O painel admin (admin/index.html) salva os dados em localStorage nas chaves
// 'admin_animes' e 'admin_categories'. O site precisa ler dessas MESMAS chaves,
// senão as alterações feitas no admin nunca aparecem aqui.
function loadAnimeData() {
    try {
        const saved = JSON.parse(localStorage.getItem('admin_animes') || 'null');
        if (Array.isArray(saved) && saved.length > 0) {
            // Garante que todos os campos usados pela interface existam,
            // mesmo que o admin não os tenha preenchido
            return saved.map(anime => ({
                seasons: 1,
                progress: 0,
                isFavorite: false,
                ...anime
            }));
        }
    } catch (e) {
        console.error('Erro ao carregar animes do admin:', e);
    }
    return [...DEFAULT_ANIME_DATA];
}

function loadCategoriesData() {
    try {
        const saved = JSON.parse(localStorage.getItem('admin_categories') || 'null');
        if (Array.isArray(saved) && saved.length > 0) {
            return saved.map((cat, i) => ({
                color: FALLBACK_CATEGORY_COLORS[i % FALLBACK_CATEGORY_COLORS.length],
                icon: 'fa-tag',
                ...cat
            }));
        }
    } catch (e) {
        console.error('Erro ao carregar categorias do admin:', e);
    }
    return [...DEFAULT_CATEGORIES];
}

let ANIME_DATA = loadAnimeData();
let CATEGORIES = loadCategoriesData();

// ===== ESTADO DA APLICAÇÃO =====
const state = {
    currentSlide: 0,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    watchHistory: JSON.parse(localStorage.getItem('watchHistory') || '[]'),
    theme: localStorage.getItem('theme') || 'dark',
    searchQuery: '',
    filteredAnimes: [...ANIME_DATA]
};

// ===== DOM REFS =====
const DOM = {};

function cacheDom() {
    DOM.heroContainer = document.getElementById('heroContainer');
    DOM.heroIndicators = document.getElementById('heroIndicators');
    DOM.heroPrev = document.getElementById('heroPrev');
    DOM.heroNext = document.getElementById('heroNext');
    DOM.notification = document.getElementById('notification');
    DOM.notifTitle = document.getElementById('notifTitle');
    DOM.notifMessage = document.getElementById('notifMessage');
    DOM.loadingOverlay = document.getElementById('loadingOverlay');
    DOM.backToTop = document.getElementById('backToTop');
    DOM.themeToggle = document.getElementById('themeToggle');
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.navMenu = document.getElementById('navMenu');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.searchBtn = document.getElementById('searchBtn');
    DOM.authBtn = document.getElementById('authBtn');
    DOM.loginModal = document.getElementById('loginModal');
    DOM.loginForm = document.getElementById('loginForm');
    DOM.loginLink = document.getElementById('loginLink');
    DOM.categoriesGrid = document.getElementById('categoriesGrid');
}

// ===== UTILITÁRIOS =====
function showNotification(title, message, isSuccess = false) {
    const icon = DOM.notification.querySelector('.notification-content i');
    icon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-info-circle';
    icon.style.color = isSuccess ? '#00c853' : 'var(--accent)';
    
    DOM.notifTitle.textContent = title;
    DOM.notifMessage.innerHTML = message;
    DOM.notification.classList.add('show');
    
    clearTimeout(DOM.notification._timeout);
    DOM.notification._timeout = setTimeout(() => {
        DOM.notification.classList.remove('show');
    }, 5000);
}

function debounce(func, wait = CONFIG.DEBOUNCE_DELAY) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getAnimeById(id) {
    return ANIME_DATA.find(anime => anime.id === id);
}

function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    if (index > -1) {
        state.favorites.splice(index, 1);
        showNotification('Removido', 'Removido dos favoritos');
    } else {
        state.favorites.push(id);
        showNotification('Adicionado', 'Adicionado aos favoritos! ❤️');
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    updateAllCarousels();
}

function isFavorite(id) {
    return state.favorites.includes(id);
}

function updateProgress(id, progress) {
    const anime = getAnimeById(id);
    if (anime) {
        anime.progress = Math.min(100, Math.max(0, progress));
        localStorage.setItem('watchHistory', JSON.stringify(state.watchHistory));
        updateAllCarousels();
    }
}

// ===== CARROSSEL =====
function createCard(anime) {
    const isFav = isFavorite(anime.id);
    const progress = anime.progress || 0;
    
    return `
        <div class="card" data-id="${anime.id}">
            <div class="card-image">
                <img src="${anime.image}" alt="${anime.title}" loading="lazy">
                <div class="card-badge">${anime.episodes} eps</div>
                <div class="card-rating">
                    <i class="fas fa-star"></i> ${anime.rating}
                </div>
                ${progress > 0 ? `
                    <div class="card-progress">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                ` : ''}
                <div class="card-actions">
                    <button onclick="event.stopPropagation(); playAnime(${anime.id})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button onclick="event.stopPropagation(); toggleFavorite(${anime.id})">
                        <i class="fas fa-${isFav ? 'heart' : 'heart'}" style="color: ${isFav ? '#e50914' : ''}"></i>
                    </button>
                    <button onclick="event.stopPropagation(); shareAnime(${anime.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <h3>${anime.title}</h3>
                <div class="meta">
                    <span>${anime.year}</span>
                    <span>${anime.genre.split(',')[0]}</span>
                </div>
            </div>
        </div>
    `;
}

function loadCarousel(containerId, items, limit = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const sliced = items.slice(0, limit);
    container.innerHTML = sliced.map(anime => createCard(anime)).join('');
    
    container.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openAnimeDetails(id);
        });
    });
}

function updateAllCarousels() {
    const sorted = [...ANIME_DATA];
    const popular = [...ANIME_DATA].sort((a, b) => b.rating - a.rating);
    const favorites = ANIME_DATA.filter(a => isFavorite(a.id));
    const continuing = ANIME_DATA.filter(a => a.progress > 0 && a.progress < 100);
    const random = [...ANIME_DATA].sort(() => Math.random() - 0.5);
    
    loadCarousel('lancamentosCarousel', sorted, 8);
    loadCarousel('popularesCarousel', popular, 8);
    loadCarousel('recomendadosCarousel', random, 8);
    loadCarousel('continuarCarousel', continuing.length > 0 ? continuing : sorted, 8);
    loadCarousel('favoritosCarousel', favorites.length > 0 ? favorites : sorted.slice(0, 6), 6);
}

// ===== HERO BANNER =====
function createHeroSlides() {
    const topAnimes = [...ANIME_DATA].sort((a, b) => b.rating - a.rating).slice(0, 5);
    
    DOM.heroContainer.innerHTML = topAnimes.map((anime, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" 
             style="background-image: url('${anime.banner}')">
            <div class="hero-content">
                <div class="badge">${anime.status || 'Em destaque'}</div>
                <h1>${anime.title}</h1>
                <p>${anime.description}</p>
                <div class="hero-meta">
                    <span><i class="fas fa-star" style="color: gold;"></i> ${anime.rating}</span>
                    <span><i class="fas fa-calendar"></i> ${anime.year}</span>
                    <span><i class="fas fa-tag"></i> ${anime.genre}</span>
                    <span><i class="fas fa-film"></i> ${anime.episodes} eps</span>
                </div>
                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="playAnime(${anime.id})">
                        <i class="fas fa-play"></i> Assistir
                    </button>
                    <button class="btn btn-secondary" onclick="toggleFavorite(${anime.id})">
                        <i class="fas fa-${isFavorite(anime.id) ? 'heart' : 'plus'}"></i>
                        ${isFavorite(anime.id) ? 'Favoritado' : 'Favoritar'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    DOM.heroIndicators.innerHTML = topAnimes.map((_, index) => `
        <span class="${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `).join('');
}

function goToSlide(index) {
    const slides = DOM.heroContainer.querySelectorAll('.hero-slide');
    const indicators = DOM.heroIndicators.querySelectorAll('span');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
    
    state.currentSlide = index;
}

function nextSlide() {
    const slides = DOM.heroContainer.querySelectorAll('.hero-slide');
    goToSlide((state.currentSlide + 1) % slides.length);
}

function prevSlide() {
    const slides = DOM.heroContainer.querySelectorAll('.hero-slide');
    goToSlide((state.currentSlide - 1 + slides.length) % slides.length);
}

function initHeroBanner() {
    createHeroSlides();
    
    let slideInterval = setInterval(nextSlide, CONFIG.AUTO_PLAY_INTERVAL);
    
    DOM.heroNext.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, CONFIG.AUTO_PLAY_INTERVAL);
    });
    
    DOM.heroPrev.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, CONFIG.AUTO_PLAY_INTERVAL);
    });
    
    DOM.heroIndicators.addEventListener('click', (e) => {
        const indicator = e.target.closest('span');
        if (!indicator) return;
        const index = parseInt(indicator.dataset.slide);
        clearInterval(slideInterval);
        goToSlide(index);
        slideInterval = setInterval(nextSlide, CONFIG.AUTO_PLAY_INTERVAL);
    });
    
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, CONFIG.AUTO_PLAY_INTERVAL);
    });
}

// ===== CATEGORIAS =====
function loadCategories() {
    if (!DOM.categoriesGrid) return;
    
    DOM.categoriesGrid.innerHTML = CATEGORIES.map(cat => `
        <div class="category-item" data-category="${cat.name}">
            <i class="fas ${cat.icon}"></i>
            <span>${cat.name}</span>
        </div>
    `).join('');
    
    DOM.categoriesGrid.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const filtered = ANIME_DATA.filter(anime => 
        anime.genre.toLowerCase().includes(category.toLowerCase())
    );
    
    if (filtered.length > 0) {
        loadCarousel('lancamentosCarousel', filtered, 8);
        document.getElementById('lancamentos').scrollIntoView({ behavior: 'smooth' });
        showNotification('Categoria', `Mostrando: ${category} (${filtered.length} títulos)`);
    } else {
        showNotification('Categoria', `Nenhum título encontrado em ${category}`);
    }
}

// ===== PESQUISA =====
function performSearch() {
    const query = DOM.searchInput.value.trim().toLowerCase();
    state.searchQuery = query;
    
    if (!query) {
        loadCarousel('lancamentosCarousel', ANIME_DATA, 8);
        showNotification('Pesquisa', 'Mostrando todos os títulos');
        return;
    }
    
    const results = ANIME_DATA.filter(anime =>
        anime.title.toLowerCase().includes(query) ||
        anime.genre.toLowerCase().includes(query) ||
        String(anime.year).includes(query) ||
        anime.studio.toLowerCase().includes(query) ||
        anime.status.toLowerCase().includes(query)
    );
    
    state.filteredAnimes = results;
    
    if (results.length > 0) {
        loadCarousel('lancamentosCarousel', results, 12);
        document.getElementById('lancamentos').scrollIntoView({ behavior: 'smooth' });
        showNotification('Resultados', `${results.length} encontrados para "${query}"`);
    } else {
        showNotification('Pesquisa', `Nenhum resultado encontrado para "${query}"`);
        showSuggestions(query);
    }
}

function showSuggestions(query) {
    const suggestions = ANIME_DATA
        .filter(anime => 
            anime.title.toLowerCase().includes(query.slice(0, 2)) ||
            anime.genre.toLowerCase().includes(query.slice(0, 2))
        )
        .slice(0, 3);
    
    if (suggestions.length > 0) {
        const suggestionText = suggestions.map(s => s.title).join(', ');
        showNotification('💡 Sugestões', `Você quis dizer: ${suggestionText}?`);
    }
}

function initSearch() {
    const debouncedSearch = debounce(performSearch, 500);
    
    DOM.searchInput.addEventListener('input', debouncedSearch);
    DOM.searchBtn.addEventListener('click', performSearch);
    DOM.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// ===== AÇÕES DOS ANIMES =====
function playAnime(id) {
    const anime = getAnimeById(id);
    if (!anime) return;
    
    if (!state.watchHistory.includes(id)) {
        state.watchHistory.push(id);
        localStorage.setItem('watchHistory', JSON.stringify(state.watchHistory));
    }
    
    const newProgress = Math.min(100, (anime.progress || 0) + 5);
    updateProgress(id, newProgress);
    
    showNotification('🎬 Reproduzindo', `<strong>${anime.title}</strong> - Episódio 1`);
    
    const playerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="position: relative; width: 90%; max-width: 800px; background: #1a1a1a; border-radius: 10px; padding: 20px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; color: #fff; font-size: 2rem; cursor: pointer; z-index: 10;">
                    <i class="fas fa-times"></i>
                </button>
                <div style="aspect-ratio: 16/9; background: #000; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: var(--accent); margin-bottom: 1rem;"></i>
                    <h3 style="color: #fff;">${anime.title}</h3>
                    <p style="color: var(--text-secondary);">Player em desenvolvimento</p>
                    <div style="width: 80%; max-width: 500px; margin-top: 1rem;">
                        <div style="background: #333; height: 4px; border-radius: 2px; overflow: hidden;">
                            <div style="width: ${anime.progress || 0}%; height: 100%; background: var(--accent);"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.5rem;">
                            <span>${Math.floor((anime.progress || 0) * 2.4)}:${String(Math.floor(((anime.progress || 0) * 2.4) % 1 * 60)).padStart(2, '0')}</span>
                            <span>${Math.floor(24 * 2.4)}:00</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button onclick="updateProgress(${id}, ${Math.max(0, (anime.progress || 0) - 5)})" 
                                style="background: transparent; border: none; color: #fff; font-size: 1.2rem;">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button onclick="showNotification('Player', 'Play/Pause')" 
                                style="background: var(--accent); border: none; color: #fff; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem;">
                            <i class="fas fa-play"></i>
                        </button>
                        <button onclick="updateProgress(${id}, ${Math.min(100, (anime.progress || 0) + 5)})" 
                                style="background: transparent; border: none; color: #fff; font-size: 1.2rem;">
                            <i class="fas fa-step-forward"></i>
                        </button>
                        <button onclick="showNotification('Player', 'Tela cheia disponível')" 
                                style="background: transparent; border: none; color: #fff; font-size: 1.2rem;">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', playerHTML);
}

function shareAnime(id) {
    const anime = getAnimeById(id);
    if (!anime) return;
    
    if (navigator.share) {
        navigator.share({
            title: anime.title,
            text: `Assista ${anime.title} no AnimeFlix!`,
            url: window.location.href
        }).catch(() => {});
    } else {
        const shareText = `🎬 ${anime.title}\n📝 ${anime.description}\n⭐ ${anime.rating}/10\n\nAssista no AnimeFlix!`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Compartilhado', 'Link copiado para a área de transferência!');
        }).catch(() => {
            prompt('Copie o link:', window.location.href);
        });
    }
}

function openAnimeDetails(id) {
    const anime = getAnimeById(id);
    if (!anime) return;
    
    const isFav = isFavorite(id);
    
    const modalHTML = `
        <div class="modal active" id="detailsModal">
            <div class="modal-content" style="max-width: 800px;">
                <button class="modal-close" onclick="closeDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; align-items: start;">
                    <img src="${anime.image}" alt="${anime.title}" style="width: 100%; border-radius: var(--radius);">
                    <div>
                        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${anime.title}</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                            <span style="background: var(--bg-card); padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                <i class="fas fa-star" style="color: gold;"></i> ${anime.rating}
                            </span>
                            <span style="background: var(--bg-card); padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                <i class="fas fa-calendar"></i> ${anime.year}
                            </span>
                            <span style="background: var(--bg-card); padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                <i class="fas fa-film"></i> ${anime.episodes} eps
                            </span>
                            <span style="background: ${anime.status === 'Em andamento' ? '#f39c12' : '#00c853'}; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; color: #fff;">
                                ${anime.status}
                            </span>
                        </div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${anime.description}</p>
                        <div style="margin-bottom: 1rem; font-size: 0.9rem;">
                            <p><strong>Gêneros:</strong> ${anime.genre}</p>
                            <p><strong>Estúdio:</strong> ${anime.studio}</p>
                            <p><strong>Temporadas:</strong> ${anime.seasons || 1}</p>
                            <p><strong>Progresso:</strong> ${anime.progress || 0}%</p>
                        </div>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <button class="btn btn-primary" onclick="playAnime(${anime.id}); closeDetailsModal();">
                                <i class="fas fa-play"></i> Assistir
                            </button>
                            <button class="btn btn-secondary" onclick="toggleFavorite(${anime.id}); closeDetailsModal();">
                                <i class="fas fa-${isFav ? 'heart' : 'heart'}"></i>
                                ${isFav ? 'Favoritado' : 'Favoritar'}
                            </button>
                            <button class="btn btn-secondary" onclick="shareAnime(${anime.id})">
                                <i class="fas fa-share"></i> Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <h3 style="margin-bottom: 1rem;">Episódios</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem;">
                        ${Array.from({length: Math.min(anime.episodes, 12)}, (_, i) => `
                            <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem; justify-content: center;" 
                                    onclick="playAnime(${anime.id}); closeDetailsModal();">
                                <i class="fas fa-play-circle"></i> Ep. ${i + 1}
                            </button>
                        `).join('')}
                        ${anime.episodes > 12 ? `
                            <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem; justify-content: center;">
                                <i class="fas fa-ellipsis-h"></i> Ver mais
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existing = document.getElementById('detailsModal');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    if (modal) modal.remove();
}

// ===== TEMA =====
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    
    const icon = DOM.themeToggle.querySelector('i');
    icon.className = state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    showNotification('Tema', `Modo ${state.theme === 'dark' ? 'escuro' : 'claro'} ativado`);
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const icon = DOM.themeToggle.querySelector('i');
    icon.className = state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

// ===== MENU MOBILE =====
function toggleMenu() {
    DOM.navMenu.classList.toggle('open');
    DOM.menuToggle.classList.toggle('active');
}

function initMobileMenu() {
    DOM.menuToggle.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                DOM.navMenu.classList.remove('open');
                DOM.menuToggle.classList.remove('active');
            }
        });
    });
}

// ===== VOLTAR AO TOPO =====
function initBackToTop() {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        DOM.backToTop.classList.toggle('visible', scrollY > 400);
    });
    
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== AUTENTICAÇÃO =====
function openLoginModal() {
    DOM.loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    DOM.loginModal.classList.remove('active');
    document.body.style.overflow = '';
}

function initAuth() {
    DOM.authBtn.addEventListener('click', openLoginModal);
    
    DOM.loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal();
    });
    
    DOM.loginModal.addEventListener('click', (e) => {
        if (e.target === DOM.loginModal) closeLoginModal();
    });
    
    DOM.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            showNotification('✅ Login', 'Login realizado com sucesso!');
            closeLoginModal();
            DOM.loginForm.reset();
        } else {
            showNotification('❌ Erro', 'Preencha todos os campos');
        }
    });
}

// ===== PWA - INSTALAÇÃO =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    setTimeout(() => {
        showNotification('📱 Instale o App', 
            'Instale o AnimeFlix no seu dispositivo. <button onclick="installApp()" class="btn btn-primary btn-sm" style="margin-top: 0.5rem;">Instalar</button>'
        );
    }, 5000);
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showNotification('✅ Sucesso', 'App instalado com sucesso!');
            }
            deferredPrompt = null;
        });
    } else {
        showNotification('ℹ️ Informação', 'Use o menu do navegador para instalar o app');
    }
}

// ===== INICIALIZAÇÃO =====
function init() {
    // Cache dos elementos DOM primeiro
    cacheDom();
    
    // Inicializar componentes
    initHeroBanner();
    updateAllCarousels();
    loadCategories();
    initSearch();
    initTheme();
    initMobileMenu();
    initBackToTop();
    initAuth();
    
    // Ocultar loading após tudo estar pronto
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            // Forçar a remoção do display caso a classe não funcione
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 800);
    
    // Mostrar boas-vindas
    setTimeout(() => {
        showNotification('👋 Bem-vindo!', 'Explore os melhores animes e séries disponíveis.');
    }, 1500);
    
    console.log('🚀 AnimeFlix carregado com sucesso!');
    console.log(`📺 ${ANIME_DATA.length} títulos disponíveis`);
    console.log(`❤️ ${state.favorites.length} favoritos`);
}

// ===== SINCRONIZAÇÃO COM O PAINEL ADMIN =====
// Se o admin for salvo em outra aba, esta função recarrega os dados
// e re-renderiza a tela sem precisar de F5.
function refreshFromAdmin() {
    ANIME_DATA = loadAnimeData();
    CATEGORIES = loadCategoriesData();
    state.filteredAnimes = [...ANIME_DATA];

    initHeroBanner();
    updateAllCarousels();
    loadCategories();

    console.log(`🔄 Dados atualizados a partir do admin: ${ANIME_DATA.length} títulos`);
}

// Dispara quando OUTRA aba/janela altera o localStorage (ex: painel admin aberto em outra aba)
window.addEventListener('storage', (e) => {
    if (e.key === 'admin_animes' || e.key === 'admin_categories') {
        refreshFromAdmin();
    }
});

// Reforça a atualização quando o usuário volta para esta aba
// (cobre casos em que o evento 'storage' não disparou a tempo)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        refreshFromAdmin();
    }
});

window.refreshFromAdmin = refreshFromAdmin;

// Aguardar DOM carregar completamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // Se o DOM já estiver carregado, iniciar imediatamente
    init();
}

// Também garantir que o loading seja removido em caso de erro
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.style.display = 'none';
        }, 1000);
    }
});

// Fallback: remover loading após 3 segundos independente do que acontecer
setTimeout(function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.style.display = 'none';
        console.log('Loading removido por fallback');
    }
}, 3000);

// Exportar funções para uso global
window.playAnime = playAnime;
window.toggleFavorite = toggleFavorite;
window.shareAnime = shareAnime;
window.updateProgress = updateProgress;
window.openAnimeDetails = openAnimeDetails;
window.closeDetailsModal = closeDetailsModal;
window.closeLoginModal = closeLoginModal;
window.installApp = installApp;
window.showNotification = showNotification;
window.getAnimeById = getAnimeById;
window.isFavorite = isFavorite;
