document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
  
    if (!email || !password) {
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }
  
    // Validação básica
    if (!email.includes('@') || password.length < 6) {
      errorMessage.textContent = 'E-mail ou senha inválidos.';
      return;
    }
  
    // Armazenar sessão
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
  
    // Redirecionar para perfil (crie depois)
    window.location.href = 'perfil.html';
  });
  