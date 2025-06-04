document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editUserForm");

  // Recupera os dados do usuário que está sendo editado
  const dados = JSON.parse(localStorage.getItem("usuarioEditando"));
  if (!dados) {
    alert("Nenhum usuário selecionado para edição.");
    window.location.href = "listagemcadastro.html";
    return;
  }

  const { nome, email, index } = dados;

  // Preenche o formulário com os dados
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Coleta os novos dados do formulário
    const novoNome = document.getElementById("nome").value.trim();
    const novoEmail = document.getElementById("email").value.trim();

    if (!novoNome || !novoEmail) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Atualiza a lista de usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios[index] = { nome: novoNome, email: novoEmail };
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Limpa o item temporário
    localStorage.removeItem("usuarioEditando");

    // Redireciona para a listagem
    window.location.href = "listagemcadastro.html";
  });
});
