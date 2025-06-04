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
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="btn-detalhes">Detalhes</a>
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
    if (sessionUser.isAdmin) {
      const btnListagem = document.getElementById('btn-listagemcadastro');
      if (btnListagem) btnListagem.style.display = 'inline-block';
    }
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
;

const toggleBtn = document.getElementById('toggle-theme');
  const body = document.body;

  // Aplica o tema salvo no carregamento
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });