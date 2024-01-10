import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { verificaCampoData, verificaCampoNome, verificaBotao } from "./validacoesFormulario.js";

const avisoNome = document.querySelector('.formulario-aviso-nome');
const avisoData = document.querySelector('.formulario-aviso-nascimento');
const camposFormulario = document.querySelectorAll('.campo-formulario');
const formulario = document.querySelector('.principal__formulario');

const tabela = document.querySelector('.tabela');

const modal = document.querySelector('.edita-campos-modal');
const camposModal = document.querySelectorAll('.campo-formulario-modal');
const avisoNovoNome = document.querySelector('.formulario-aviso-novo-nome');
const avisoNovaData = document.querySelector('.formulario-aviso-novo-nascimento');
const modalForm = document.querySelector('.edita-campos__formulario');
const cancelarBtnModal = document.querySelector('.cancelarBtn');

const listaVazia = document.querySelector('.lista-vazia');

function verificaLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('aniversarios')) || [];
    storage.forEach((aniversario) => {
        criaTabela(aniversario);
    });

    if (storage.length > 0) {
        listaVazia.style.display = "none";
        tabela.style.display = "table";
    } 
}

verificaLocalStorage();

camposModal.forEach((campo) => {
    atualizaCaracteres(campo);
    adicionaVerificacaoDoCampo(campo)
});

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const storage = JSON.parse(localStorage.getItem('aniversarios'));
    const trEditando = document.querySelector('.editando');
    camposModal.forEach((campo) => {
        if (campo.value !== "") {
            if (campo.id === "novoNome") {
                trEditando.children[0].innerText = campo.value;
                return;
            }
            trEditando.children[1].innerText = campo.value;
        }
    });
    const tds = trEditando.querySelectorAll('.td');

    if (storage && storage.length > 0) {
        storage.forEach((elemento) => {
            if (elemento.id === trEditando.id) {
                elemento.nome = tds[0].innerText;
                elemento.data = tds[1].innerText;
            }
        });
    }
    
    localStorage.setItem('aniversarios', JSON.stringify(storage));

    trEditando.classList.remove("editando");

    camposModal.forEach((campo) => campo.value = "");

    modal.close();
});

cancelarBtnModal.addEventListener('click', () => {
    modal.close();
    document.querySelector('.editando').classList.remove('editando');
});
/* atualiza a quantidade de caracteres restantes do campo */
camposFormulario.forEach((campo) => {
    atualizaCaracteres(campo);
    adicionaVerificacaoDoCampo(campo);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (camposFormulario[0].value === "" || camposFormulario[1].value === "") {
        camposFormulario.forEach((campo) => verificaBotao(campo));
        return;
    }

    const objetoAniversario = {
        id: uuidv4(),
        nome: camposFormulario[0].value,
        data: camposFormulario[1].value
    };

    listaVazia.style.display = "none";
    tabela.style.display = "table";
    criaTabela(objetoAniversario);
    adicionaLocalStorage(objetoAniversario);
    limpaFormulario();
});

function criaTabela({ nome, data, id }) {
    const tr = document.createElement('tr');
    tr.id = id;
    const tdNome = document.createElement('td');
    tdNome.innerText = nome;
    tdNome.classList.add('td');
    
    const tdData = document.createElement('td');
    tdData.innerText = data;
    tdData.classList.add('td');

    const tdAcao = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.innerText = "Editar";
    btnEditar.addEventListener('click', () => editaAniversario(id))

    const btnDeletar = document.createElement('button');
    btnDeletar.innerText = "Deletar";
    btnDeletar.addEventListener('click', () => deletaAniversario(id));

    tdAcao.appendChild(btnEditar);
    tdAcao.appendChild(btnDeletar);

    tr.appendChild(tdNome);
    tr.appendChild(tdData);
    tr.appendChild(tdAcao);

    tabela.appendChild(tr);
}

function limpaFormulario() {
    camposFormulario.forEach((campo) => {
        campo.value = "";
        campo.nextElementSibling.innerText = campo.id === "nome" ? 60 : 10;
    });
}

function deletaAniversario(id) {
    document.getElementById(id).remove();
    const storage = JSON.parse(localStorage.getItem('aniversarios')) || [];
    const filtra = storage.filter((e) => e.id !== id);
    if (filtra.length === 0) {
        listaVazia.style.display = "block";
        tabela.style.display = "none";
    }
    localStorage.setItem('aniversarios', JSON.stringify(filtra));
}

function editaAniversario(id) {
    const tdAEditar = document.getElementById(id);
    const tdNomeEData = tdAEditar.querySelectorAll('.td');

    tdAEditar.classList.add("editando");

    camposModal.forEach((campo, index) => campo.value = tdNomeEData[index].innerText);
    modal.showModal();
}

function atualizaCaracteres(campo) {
    campo.addEventListener('input', (e) => {
        const tamanhoDeCaracteres = e.target.value.length;
        const tamanhoMax = campo.getAttribute("maxLength");
        campo.nextElementSibling.innerText = tamanhoMax - tamanhoDeCaracteres;
    });
}

function adicionaVerificacaoDoCampo(campo) {
    const objCampos = {
        nome: () => verificaCampoNome(campo, avisoNome),
        nascimento: () => verificaCampoData(campo, avisoData),
        novoNome: () => verificaCampoNome(campo, avisoNovoNome),
        novoNascimento: () => verificaCampoData(campo, avisoNovaData),
    }

    campo.addEventListener('blur', () => {
        objCampos[campo.id]();
    });
}

function adicionaLocalStorage(infoAniversario) {
    const storage = JSON.parse(localStorage.getItem('aniversarios')) || [];
    
    if(storage) localStorage.setItem('aniversarios', JSON.stringify([...storage, infoAniversario]));
}
