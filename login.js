document.addEventListener('DOMContentLoaded', () => {
  
  const loginForm = document.getElementById('login-form');
  const toggleBtn = document.getElementById('toggle-theme');
  const body = document.body;
  const errorMessage = document.getElementById('error-message');

  // Função para aplicar tema salvo e atualizar o ícone
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
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';
    }
  });

  // Lógica de login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuariosSalvos.find(user => user.email === email && user.senha === password);

    if (usuarioEncontrado) {
      const sessionUser = { email: usuarioEncontrado.email, name: usuarioEncontrado.nome };
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
      window.location.href = 'perfil.html';
    } else {
      errorMessage.textContent = 'E-mail ou senha incorretos.';
    }
  });
});