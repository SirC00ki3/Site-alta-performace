document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Validação básica
  if (!email || !password) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  // Verificar se o usuário existe no localStorage
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioEncontrado = usuariosSalvos.find(user => user.email === email && user.senha === password);

  if (usuarioEncontrado) {
    // Armazenar sessão
    localStorage.setItem('userEmail', usuarioEncontrado.email);
    localStorage.setItem('isLoggedIn', 'true');

    // Redirecionar para o perfil
    window.location.href = 'perfil.html';
  } else {
    errorMessage.textContent = 'E-mail ou senha incorretos.';
  }
});
