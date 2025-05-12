const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

const moviesContainer = document.getElementById('movies-container');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
        </div>
      `;
      moviesContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os filmes:', error);
  });