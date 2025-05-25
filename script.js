const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Dados personalizados para a seção "Avaliações Populares"
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
    text: 'Cinco desajustados emocionalmente constipados são forçados a criar laços traumáticos sob o olhar atento de uma figura de autoridade moralmente falida e ah, hum, então este é o clube do café da manhã com uniforme tático. Eu vivo.',
    likes: 6500,
    vote: 4.2,
    poster: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg'
  }
];

/**
 * Carrega e exibe filmes ou reviews em um contêiner da página.
 * @param {string} endpoint - Endpoint da TMDB API.
 * @param {string} containerId - ID do contêiner no HTML.
 */
function fetchMovies(endpoint, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  // Se for o container de reviews personalizados
  if (containerId === 'top-rated-container') {
    customReviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <img src="${IMG_BASE_URL}${review.poster}" alt="Poster do filme ${review.title}" />
        <div class="review-content">
          <div class="review-title">${review.title} <span style="color: #888">(${review.year})</span></div>
          <div class="review-user">👤 ${review.username}</div>
          <div class="review-text">${review.text}</div>
          <div class="review-likes">❤️ ${review.likes.toLocaleString()} curtidas</div>
        </div>
      `;
      container.appendChild(card);
    });
    return;
  }

  // Para os demais containers, busca na API
  fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(response => response.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        container.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
      }

      data.results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
          <img src="${IMG_BASE_URL}${movie.poster_path}" alt="Capa de ${movie.title}" />
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average.toFixed(1)}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error(`Erro ao carregar ${containerId}:`, error);
      container.innerHTML = '<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>';
    });
}

// Inicializa os dados nas seções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  fetchMovies('/movie/popular', 'movies-container');             // Filmes Populares
  fetchMovies('/trending/movie/week', 'weekly-popular-container'); // Populares da Semana
  fetchMovies('/movie/top_rated', 'top-rated-container');        // Avaliações Populares (mock)
  fetchMovies('/movie/now_playing', 'recent-releases-container'); // Recém Lançados
});
const btn = document.getElementById('toggle-theme-btn');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('toggle-theme');

  // Aplica o tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
});