const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function fetchMovies(endpoint, containerId) {
  fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = ''; // limpa antes de adicionar
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
<<<<<<< HEAD
  })
  .catch(error => {
    console.error('Erro ao carregar os filmes:', error);
  });
=======
}

// Chama para cada seção
fetchMovies('/movie/popular', 'movies-container'); // Filmes Populares
fetchMovies('/trending/movie/week', 'weekly-popular-container'); // Populares da Semana
fetchMovies('/movie/top_rated', 'top-rated-container'); // Melhores Avaliados
fetchMovies('/movie/now_playing', 'recent-releases-container'); // Recém Lançados
>>>>>>> 1a103a3 (Commit focado na apresentação do index)
