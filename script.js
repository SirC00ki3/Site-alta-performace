const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
  // --- TEMA ESCURO ---
  const toggleBtn = document.getElementById('toggle-theme');
  const body = document.body;

  const aplicarTemaSalvo = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      toggleBtn.textContent = '🌙';
    } else {
      body.classList.remove('dark-theme');
      toggleBtn.textContent = '☀️';
    }
  };

  aplicarTemaSalvo();

  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme');
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';
    }
  });

  // --- LOGIN / BOTÕES DE NAVEGAÇÃO ---
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let sessionUser;

  try {
    sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  } catch (e) {
    sessionUser = null;
  }

  const btnEntrar = document.getElementById('btn-entrar');
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const btnPerfil = document.getElementById('btn-perfil');
  const btnSair = document.getElementById('btn-sair');

  const isSessaoValida = sessionUser && sessionUser.name && sessionUser.email;

  if (isLoggedIn && isSessaoValida) {
    if (btnEntrar) btnEntrar.style.display = 'none';
    if (btnCadastrar) btnCadastrar.style.display = 'none';
    if (btnPerfil) btnPerfil.style.display = 'inline-block';
    if (btnSair) btnSair.style.display = 'inline-block';
  } else {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionUser');
    if (btnEntrar) btnEntrar.style.display = 'inline-block';
    if (btnCadastrar) btnCadastrar.style.display = 'inline-block';
    if (btnPerfil) btnPerfil.style.display = 'none';
    if (btnSair) btnSair.style.display = 'none';
  }

  if (btnSair) {
    btnSair.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('sessionUser');
      window.location.href = 'index.html';
    });
  }
});

// Reviews personalizadas apenas para 'top-rated-container'
const customReviews = [
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Zoe Rose Bryant',
    text: 'O MCU vs. a epidemia de solidão masculina',
    likes: 19454,
    vote: 4.8,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Preet',
    text: 'todo o esquadrão suicida',
    likes: 18449,
    vote: 4.7,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  },
  {
    title: 'Homem-Aranha: No Aranhaverso',
    year: 2018,
    username: 'James (Schaffrillas)',
    text: 'Minha mãe queria assistir a um filme da Marvel e sugeriu este ou Capitão América: Admirável Mundo Novo. Não sei se vocês acham que fiz a escolha certa.',
    likes: 4269,
    vote: 5,
    poster: '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: '.｡*❀ máx ❀*｡.',
    text: 'quando seu círculo é pequeno, mas vocês estão deprimidos',
    likes: 11931,
    vote: 4.6,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'ConnorEatsPants',
    text: 'Minha esposa não fala comigo depois de votar em Bucky Barnes para o Congresso. Diz que "ele matou John F. Kennedy". Só acho que está na hora de um forasteiro em Washington. Eu sou o babaca?',
    likes: 11117,
    vote: 4.5,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Iman Vellani',
    text: 'Cinco desajustados emocionalmente constipados são forçados a criar laços traumáticos sob o olhar atento de uma figura de autoridade moralmente falida e... ah, hum, então este é o clube do café da manhã com uniforme tático. Eu vivo.',
    likes: 6500,
    vote: 4.2,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  }
];

// Função principal
function fetchMovies(endpoint, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  // Se for a seção de Avaliações Populares (top-rated), use os dados mockados
  if (containerId === 'top-rated-container') {
    customReviews.slice(0, 6).forEach(review => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <img src="${IMG_BASE_URL}${review.poster}" alt="${review.title}" />
        <div class="review-content">
          <div class="review-title">${review.title} <span style="color: #888">(${review.year})</span></div>
          <div class="review-user">👤 ${review.username}</div>
          <div class="review-text">${review.text}</div>
          <div class="review-likes">❤️ ${review.likes.toLocaleString()} curtidas</div>
        </div>
      `;
      container.appendChild(card);
    });
    return; // Impede que continue tentando buscar da API
  }

  // Para outras seções, use a API normalmente
  fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
          <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error(`Erro ao carregar ${containerId}:`, error);
    });
}

// Chamadas das seções
fetchMovies('/movie/popular', 'movies-container'); // Filmes Populares
fetchMovies('/trending/movie/week', 'weekly-popular-container'); // Populares da Semana
fetchMovies('/movie/top_rated', 'top-rated-container'); // Avaliações Populares (mock)
fetchMovies('/movie/now_playing', 'recent-releases-container'); // Recém Lançados

