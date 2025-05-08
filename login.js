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

  // Dados fixos para simulação de login
  const emailCorreto = 'administracaoconcha@gmail.com';
  const senhaCorreta = 'concha2025';

  // Verificação de login
  if (email === emailCorreto && password === senhaCorreta) {
    // Armazenar sessão
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');

    // Redirecionar para o perfil
    window.location.href = 'perfil.html';
  } else {
    errorMessage.textContent = 'E-mail ou senha incorretos.';
  }
});
