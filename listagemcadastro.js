// Seleção de elementos
const tbody = document.getElementById("usuariosBody");
const searchInput = document.getElementById("searchInput");
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// === Função: Aplicar tema salvo ===
function aplicarTemaSalvo() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (toggleBtn) toggleBtn.textContent = '🌙';
  } else {
    body.classList.remove('dark-theme');
    if (toggleBtn) toggleBtn.textContent = '☀️';
  }
}

// === Evento: Alternar tema ===
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
  });
}

// Dados do localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// === Função: Renderizar Tabela ===
function renderTable(lista) {
  tbody.innerHTML = "";

  if (lista.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="3">Nenhum usuário encontrado.</td>`;
    tbody.appendChild(row);
    return;
  }

  lista.forEach((usuario, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>
        <button class="editar-btn" onclick="editarUsuario(${index})">Editar</button>
        <button class="excluir-btn" onclick="excluirUsuario(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === Evento: Filtro ao digitar no campo de busca ===
searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(termo) ||
    u.email.toLowerCase().includes(termo)
  );
  renderTable(filtrados);
});

// === Função: Excluir Usuário ===
function excluirUsuario(index) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderTable(usuarios);
  }
}

// === Função: Editar Usuário ===
function editarUsuario(index) {
  const novoNome = prompt("Digite o novo nome:", usuarios[index].nome);
  const novoEmail = prompt("Digite o novo e-mail:", usuarios[index].email);

  if (novoNome && novoEmail) {
    usuarios[index].nome = novoNome.trim();
    usuarios[index].email = novoEmail.trim();
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderTable(usuarios);
  }
}

// === Função: Verificar sessão e ajustar botões ===
function verificarSessao() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let sessionUser = null;

  try {
    sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  } catch {
    sessionUser = null;
  }

  const btnEntrar = document.getElementById('btn-entrar');
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const btnPerfil = document.getElementById('btn-perfil');
  const btnSair = document.getElementById('btn-sair');
  const btnListagem = document.getElementById('btn-listagemcadastro');

  const isSessaoValida = sessionUser && sessionUser.name && sessionUser.email;

  if (isLoggedIn && isSessaoValida) {
    if (btnEntrar) btnEntrar.style.display = 'none';
    if (btnCadastrar) btnCadastrar.style.display = 'none';
    if (btnPerfil) btnPerfil.style.display = 'inline-block';
    if (btnSair) btnSair.style.display = 'inline-block';

    if (sessionUser.isAdmin && btnListagem) {
      btnListagem.style.display = 'inline-block';
    }
  } else {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionUser');
    if (btnEntrar) btnEntrar.style.display = 'inline-block';
    if (btnCadastrar) btnCadastrar.style.display = 'inline-block';
    if (btnPerfil) btnPerfil.style.display = 'none';
    if (btnSair) btnSair.style.display = 'none';
    if (btnListagem) btnListagem.style.display = 'none';
  }

  if (btnSair) {
    btnSair.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('sessionUser');
      window.location.href = 'index.html';
    });
  }
}

// === Inicialização ===
renderTable(usuarios);
aplicarTemaSalvo();
verificarSessao();
