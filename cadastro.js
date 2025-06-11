
  const toggleBtn = document.getElementById('toggle-theme'); //Pega o botão com id="toggle-theme" — este botão troca o tema da página.
  const body = document.body; //Pega o corpo do HTML (ou seja, a tag <body> inteira).

  const aplicarTemaSalvo = () => {
    const savedTheme = localStorage.getItem('theme');//Verifica se existe um tema salvo no localStorage do navegador.
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      toggleBtn.textContent = '🌙'; //se o tema for "dark", adiciona a classe CSS dark-theme ao <body> e muda o texto do botão para 🌙.
    } else {
      body.classList.remove('dark-theme');
      toggleBtn.textContent = '☀️'; //Caso contrário, remove o modo escuro e mostra ☀️.
    }
  };

  aplicarTemaSalvo(); //Chama a função assim que a página carrega.

  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme'); //Quando o botão é clicado, alterna a classe dark-theme.
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';
    }
  }); //Salva a escolha no localStorage.

document.getElementById('singup-form').addEventListener('submit', function (event) {
  event.preventDefault(); //Impede que a página atualize ao enviar o formulário.

  const nome = document.getElementById('Nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value;
  const erro = document.getElementById('error-message'); //ega valores digitados no formulário.

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const senhaForte = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);

  if (nome.length < 4) {
    erro.textContent = 'O nome deve ter pelo menos 4 letras.';
    return;
  } //Valida o tamanho do nome.

  if (!emailValido) {
    erro.textContent = 'E-mail inválido.';
    return;
  }

  if (!senhaForte) {
    erro.textContent = 'A senha deve ter no mínimo 8 caracteres, com uma letra maiúscula e um número.';
    return;
  } //Mensagens de erro personalizadas.

  const novoUsuario = { nome, email, senha };
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || []; //Cria um novo usuário e busca usuários já salvos no navegador.

  const existe = usuariosSalvos.some(user => user.email === email); // Verifica se já existe usuário com esse email.
  if (existe) {
    erro.textContent = 'Este e-mail já está cadastrado.';
    return;
  } //Se já existe, mostra erro.

  usuariosSalvos.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos)); //Salva novo usuário.

  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html'; //Mostra mensagem de sucesso e redireciona para a página de login.


});
