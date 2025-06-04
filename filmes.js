const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const body = document.body;

// Função para aplicar o tema salvo no carregamento da página
function aplicarTemaSalvo() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    toggleBtn.textContent = '🌙';
  } else {
    body.classList.remove('dark-theme');
    toggleBtn.textContent = '☀️';
  }
}

// Toggle de tema
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '🌙' : '☀️';
});

aplicarTemaSalvo();

// Dados mockados para avaliações populares
const customReviews = [
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Zoe Rose Bryant',
    text: 'O MCU vs. a epidemia de solidão masculina',
    likes: 19454,
    vote: 4.8,
    poster: 'images/thunderbolts_poster.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Preet',
    text: 'todo o esquadrão suicida',
    likes: 18449,
    vote: 4.7,
    poster: 'images/thunderbolts_poster.jpg'
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
    poster: 'images/thunderbolts_poster.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'ConnorEatsPants',
    text: 'Minha esposa não fala comigo depois de votar em Bucky Barnes para o Congresso. Diz que "ele matou John F. Kennedy". Só acho que está na hora de um forasteiro em Washington. Eu sou o babaca?',
    likes: 11117,
    vote: 4.5,
    poster: 'images/thunderbolts_poster.jpg'
  },
  {
    title: 'Thunderbolts*',
    year: 2025,
    username: 'Iman Vellani',
    text: 'Cinco desajustados emocionalmente constipados são forçados a criar laços traumáticos sob o olhar atento de uma figura de autoridade moralmente falida e... ah, hum, então este é o clube do café da manhã com uniforme tático. Eu vivo.',
    likes: 6500,
    vote: 4.2,
    poster: 'images/thunderbolts_poster.jpg'
  }
];

// Função para buscar e exibir filmes ou reviews
function fetchMovies(endpoint, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (containerId === 'top-rated-container') {
    // Usar dados mockados para avaliações populares
    customReviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'review-card';

      const isTMDBPoster = review.poster.startsWith('/');
      const posterURL = isTMDBPoster ? `${IMG_BASE_URL}${review.poster}` : review.poster;

      card.innerHTML = `
        <img src="${posterURL}" alt="${review.title} Poster" class="review-poster" />
        <div class="review-content">
          <div class="review-title">${review.title} <span class="year">(${review.year})</span></div>
          <div class="review-user">👤 ${review.username}</div>
          <div class="review-text">${review.text}</div>
          <div class="review-likes">❤️ ${review.likes.toLocaleString()} curtidas</div>
          <div class="review-vote">⭐ ${review.vote}</div>
        </div>
      `;
      container.appendChild(card);
    });
    return;
  }

  // Buscar dados da API TMDB para outras seções
  fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const posterURL = movie.poster_path 
          ? `${IMG_BASE_URL}${movie.poster_path}` 
          : 'images/placeholder.jpg'; // imagem placeholder se não tiver poster

        card.innerHTML = `
          <img src="${posterURL}" alt="${movie.title}" />
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
      container.innerHTML = '<p>Erro ao carregar filmes.</p>';
    });
}

// Carregar as seções
fetchMovies('/movie/popular', 'movies-container');
fetchMovies('/trending/movie/week', 'weekly-popular-container');
fetchMovies('/movie/top_rated', 'top-rated-container');
