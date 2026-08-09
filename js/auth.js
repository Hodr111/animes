/**
 * AnimeFlix - Autenticação e Gerenciamento de Usuário
 */

const userState = {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem('authToken'),
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
    history: JSON.parse(localStorage.getItem('watchHistory') || '[]')
};

const DEMO_USERS = [
    {
        id: 1,
        name: 'Usuário Demo',
        email: 'demo@animeflix.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        isVIP: true
    },
    {
        id: 2,
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'joao123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
        isVIP: false
    }
];

function login(email, password) {
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
        userState.isLoggedIn = true;
        userState.user = user;
        userState.token = 'fake-jwt-token-' + Date.now();
        localStorage.setItem('authToken', userState.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showNotification('✅ Sucesso', `Bem-vindo de volta, ${user.name}!`);
        updateAuthUI();
        return true;
    } else {
        showNotification('❌ Erro', 'Email ou senha inválidos');
        return false;
    }
}

function logout() {
    userState.isLoggedIn = false;
    userState.user = null;
    userState.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    showNotification('👋 Até logo', 'Você foi desconectado');
    updateAuthUI();
}

function register(name, email, password) {
    if (DEMO_USERS.find(u => u.email === email)) {
        showNotification('❌ Erro', 'Este email já está cadastrado');
        return false;
    }
    
    const newUser = {
        id: DEMO_USERS.length + 1,
        name: name,
        email: email,
        password: password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isVIP: false
    };
    
    DEMO_USERS.push(newUser);
    showNotification('✅ Sucesso', 'Cadastro realizado com sucesso!');
    return true;
}

function updateAuthUI() {
    const authBtn = document.querySelector('.auth-btn');
    if (userState.isLoggedIn && userState.user) {
        authBtn.innerHTML = `<img src="${userState.user.avatar}" style="width: 30px; height: 30px; border-radius: 50%;">`;
        authBtn.title = userState.user.name;
    } else {
        authBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
        authBtn.title = 'Entrar';
    }
}

function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            userState.isLoggedIn = true;
            userState.user = user;
            updateAuthUI();
        } catch (e) {
            console.warn('Erro ao carregar usuário:', e);
        }
    }
}

function getUser() {
    return userState.user;
}

function isVIP() {
    return userState.user && userState.user.isVIP;
}

checkAuth();
