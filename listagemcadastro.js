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

// Botão Editar (simples por enquanto)
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

// Renderiza a tabela inicialmente
renderTable(usuarios);
