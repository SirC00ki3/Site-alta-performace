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
          <button class="details-btn" data-id="${movie.id}">Ver detalhes</button>
        </div>
      `;
      moviesContainer.appendChild(card);
    });

    // Adicionar evento aos botões
    document.querySelectorAll('.details-btn').forEach(button => {
      button.addEventListener('click', event => {
        const movieId = event.target.getAttribute('data-id');
        // Redireciona para a página oficial do filme no TMDb
        window.open(`https://www.themoviedb.org/movie/${movieId}`, '_blank');
      });
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os filmes:', error);
  });
