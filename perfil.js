
    const session = JSON.parse(localStorage.getItem('sessionUser'));
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
  
    if (!session) {
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = 'login.html';
    } else {
      nameInput.value = session.name;
      emailInput.value = session.email;
    }
  
    document.getElementById('profile-form').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const updatedUser = {
        name: nameInput.value,
        email: emailInput.value
      };
  
      // Atualiza a sessão atual
      localStorage.setItem('sessionUser', JSON.stringify(updatedUser));
  
      // Atualiza o cadastro na lista de usuários
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
      usuarios = usuarios.map(user =>
        user.email === session.email ? { ...user, name: updatedUser.name, email: updatedUser.email } : user
      );
  
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      alert('Informações atualizadas com sucesso!');
    });
