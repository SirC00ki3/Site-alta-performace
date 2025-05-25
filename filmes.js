const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Busca e exibe filmes populares
 */
function loadAllMovies() {
  const container = document.getElementById('all-movies-container');
  container.innerHTML = '<p>Carregando filmes...</p>';

  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = ''; // Limpa o "carregando"
      data.results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
          <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average.toFixed(1)}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar filmes:', error);
      container.innerHTML = '<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>';
    });
}

document.addEventListener('DOMContentLoaded', loadAllMovies);
