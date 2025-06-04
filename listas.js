const API_KEY = '574ae54f6fd66e60543359675d336fe5';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesContainer = document.getElementById('movies-container');
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// Aplicar tema salvo
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

// Alternar tema ao clicar no botão
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '🌙' : '☀️';
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

const userLists = [
  {
    owner: 'Myke',
    title: 'Meus filmes favoritos',
    movieIds: [634649, 76600, 399566],
    likes: 1.228,
    comments: 450
  },
  {
    owner: 'Maria',
    title: 'Clássicos imperdíveis',
    movieIds: [238, 155, 680],
    likes: 2.234,
    comments: 600
  },
  {
    owner: 'Lucas',
    title: 'Filmes que mudaram minha vida',
    movieIds: [27205, 157336, 550],
    likes: 1.890,
    comments: 320
  },
  {
    owner: 'Ana',
    title: 'Drama e emoção',
    movieIds: [122, 13, 539],
    likes: 980,
    comments: 150
  },
  {
    owner: 'Carlos',
    title: 'Ação sem limites',
    movieIds: [597, 603, 604],
    likes: 1.560,
    comments: 275
  },
  {
    owner: 'Fernanda',
    title: 'Sci-fi que amo',
    movieIds: [157336, 603, 807],
    likes: 2.010,
    comments: 390
  },
  {
    owner: 'João',
    title: 'Terror que dá medo',
    movieIds: [424, 948, 8078],
    likes: 745,
    comments: 112
  },
  {
    owner: 'Beatriz',
    title: 'Comédias favoritas',
    movieIds: [496243, 862, 920],
    likes: 1.345,
    comments: 220
  },
  {
    owner: 'Renato',
    title: 'Animações inesquecíveis',
    movieIds: [14160, 129, 585],
    likes: 1.987,
    comments: 340
  }
];

const userListsContainer = document.getElementById('user-lists');

userLists.forEach(list => {
  const listCard = document.createElement('div');
  listCard.className = 'list-card';

  const listImages = document.createElement('div');
  listImages.className = 'list-images';

  list.movieIds.slice(0, 5).forEach(id => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(movie => {
        const img = document.createElement('img');
        img.src = `${IMG_BASE_URL}${movie.poster_path}`;
        img.alt = movie.title;
        listImages.appendChild(img);
      })
      .catch(err => console.error('Erro ao carregar filme:', err));
  });

  const listInfo = document.createElement('div');
  listInfo.className = 'list-info';
  listInfo.innerHTML = `
    <h3>${list.title}</h3>
    <p>
      <span class="owner">por ${list.owner}</span> · 
      <span class="count">${list.movieIds.length} filmes</span> · 
      <span class="likes">❤️ ${list.likes}</span> · 
      <span class="comments">💬 ${list.comments}</span>
    </p>
  `;

  listCard.appendChild(listImages);
  listCard.appendChild(listInfo);
  userListsContainer.appendChild(listCard);
});
