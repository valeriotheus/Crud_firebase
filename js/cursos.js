// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCUYlakfVfYHXZFW8MfB1fd2LbQ6i2RYc",
    authDomain: "crud-dados.firebaseapp.com",
    databaseURL: "https://crud-dados-default-rtdb.firebaseio.com",
    projectId: "crud-dados",
    storageBucket: "crud-dados.firebasestorage.app",
    messagingSenderId: "618471645261",
    appId: "1:618471645261:web:43aedbfcac5c6a04c3bc04",
    measurementId: "G-YM16QN92VH"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref("cursos");
  
  // Carregar usuários
  function carregarCursos() {
    db.on("value", (snapshot) => {
      const tbody = $("#tabelaCursos");
      tbody.empty();
      snapshot.forEach((child) => {
        const user = child.val();
        const key = child.key;
        tbody.append(`
          <tr>
            <td>${user.nome}</td>
            <td>${user.iid}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
            </td>
          </tr>
        `);
      });
    });
  }
  
  // Salvar usuário (create/update)
  $("#formCursos").submit(function (e) {
    e.preventDefault();
  
    const id = $("#id").val();
    const nome = $("#txtnome").val();
    const iid = $("#txtiid").val();
  
    if (id) {
      db.child(id).update({ iid, nome});
    } else {
      db.push({ iid, nome});
    }
  
    this.reset();
    $("#id").val("");
  });
  
  // Editar
  $(document).on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    db.child(id)
      .get()
      .then((snapshot) => {
        const user = snapshot.val();
        $("#id").val(id);
        $("#txtnome").val(user.nome);
        $("#txtiid").val(user.iid);
      });
  });
  
  // Excluir
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir?")) {
      db.child(id).remove();
    }
  });
  
  // Inicializar
  carregarCursos();
  
