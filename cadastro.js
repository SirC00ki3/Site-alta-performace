document.getElementById('singup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('Nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value;
  const erro = document.getElementById('error-message');

  // Validação de e-mail com regex
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validação de senha forte: mínimo 8 caracteres, 1 letra maiúscula e 1 número
  const senhaForte = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);

  // Verificações
  if (nome.length < 4) {
    erro.textContent = 'O nome deve ter pelo menos 4 letras.';
    return;
  }

  if (!emailValido) {
    erro.textContent = 'E-mail inválido.';
    return;
  }

  if (!senhaForte) {
    erro.textContent = 'A senha deve ter no mínimo 8 caracteres, com uma letra maiúscula e um número.';
    return;
  }

  // Se tudo estiver válido
  erro.textContent = '';

  // Armazenar no localStorage
  const novoUsuario = { nome, email, senha };
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar se o e-mail já está cadastrado
  const existe = usuariosSalvos.some(user => user.email === email);
  if (existe) {
    erro.textContent = 'Este e-mail já está cadastrado.';
    return;
  }

  usuariosSalvos.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));

  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html';
});
