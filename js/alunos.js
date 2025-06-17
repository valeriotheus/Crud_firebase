// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBx-wFdKUnjFkhgPiqp-Yi3VB36t57zjr0",
    authDomain: "jquery-1c95a.firebaseapp.com",
    databaseURL: "https://jquery-1c95a-default-rtdb.firebaseio.com",
    projectId: "jquery-1c95a",
    storageBucket: "jquery-1c95a.firebasestorage.app",
    messagingSenderId: "453180360781",
    appId: "1:453180360781:web:b75bc5ebcdb2076764f404",
    measurementId: "G-1LBED4D114"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("alunos"); // Alterando para "alunos"

// Carregar alunos
function carregarAlunos() {
    db.on("value", (snapshot) => {
        const tbody = $("#tabelaAlunos"); // Alterando a tabela para "tabelaAlunos"
        tbody.empty();
        snapshot.forEach((child) => {
            const aluno = child.val();
            const key = child.key;
            tbody.append(`
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.telefone}</td>
                    <td>${aluno.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
                    </td>
                </tr>
            `);
        });
    });
}

// Salvar aluno (create/update)
$("#formAluno").submit(function (e) {
    e.preventDefault();

    const id = $("#id").val();
    const nome = $("#txtnome").val();
    const telefone = $("#txtfone").val();
    const email = $("#txtemail").val();

    if (id) {
        db.child(id).update({ nome, telefone, email });
    } else {
        db.push({ nome, telefone, email });
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
            const aluno = snapshot.val();
            $("#id").val(id);
            $("#txtnome").val(aluno.nome);
            $("#txtfone").val(aluno.telefone);
            $("#txtemail").val(aluno.email);
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
carregarAlunos();
