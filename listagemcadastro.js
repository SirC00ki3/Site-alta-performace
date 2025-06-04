const tbody = document.getElementById("usuariosBody");
const searchInput = document.getElementById("searchInput");

// Pega os usuários do localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


// Função para renderizar a tabela
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

// Filtro ao digitar no campo de busca
searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(termo) ||
    u.email.toLowerCase().includes(termo)
  );
  renderTable(filtrados);
});

// Botão Excluir
function excluirUsuario(index) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderTable(usuarios);
  }
}

// Botão Editar com redirecionamento
function editarUsuario(index) {
  const usuario = usuarios[index];

  // Salva o usuário e o índice temporariamente no localStorage
  localStorage.setItem("usuarioEditando", JSON.stringify({ ...usuario, index }));

  // Redireciona para a tela de edição
  window.location.href = "edit_listagem.html";
}

// Renderiza a tabela inicialmente
renderTable(usuarios);

let indexParaExcluir = null;

function excluirUsuario(index) {
  indexParaExcluir = index;
  document.getElementById("modalConfirmacao").classList.remove("hidden");
}

document.getElementById("btnConfirmar").addEventListener("click", () => {
  if (indexParaExcluir !== null) {
    usuarios.splice(indexParaExcluir, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderTable(usuarios);
    indexParaExcluir = null;
  }
  document.getElementById("modalConfirmacao").classList.add("hidden");
});

document.getElementById("btnCancelar").addEventListener("click", () => {
  indexParaExcluir = null;
  document.getElementById("modalConfirmacao").classList.add("hidden");
});
const body = document.body;
const toggleBtn = document.getElementById('toggle-theme-btn');
