const avisoNome = document.querySelector('.formulario-aviso-nome');
const avisoData = document.querySelector('.formulario-aviso-nascimento');

const erros = {
    patternMismatch: "A data deve seguir o formato dd/mm/aaaa",
    tooShort: "O nome deve conter pelo menos 3 caracteres.",
    customError: "O nome não pode conter números.",
    dataError: "Insira uma data válida.",
    emptyInput: "O campo não pode estar vazio."
}

export function verificaCampoNome(campo, campoAviso) {
    /* verifica se existem numeros no nome */
    const regex = /[0-9]/g;
    const verificaNumeros = regex.test(campo.value);
    if (verificaNumeros) {
        campoAviso.innerText = erros.customError;
        campo.setCustomValidity(erros.customError);
        return;
    } else {
        campoAviso.innerText = "";
        campo.setCustomValidity("");
    }

    /* verifica se tem menos de 3 caracteres */
    if (campo.validity.tooShort) {
        campoAviso.innerText = erros.tooShort;
        return;
    } else {
        campoAviso.innerText = "";
    }
}

export function verificaCampoData(campo, campoAviso) {
    if (campo.value !== "") {
        /* verifica se a data possui o formato valido */
        if (campo.validity.patternMismatch) {
            campoAviso.innerText = erros.patternMismatch;
            return;
        } else {
            campoAviso.innerText = "";
        }
    
        /* valida data */
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const dataAtualSeparada = dataAtual.split('/');
        const dataCampoSeparado = campo.value.split('/');
    
        const data = {
            dia: dataCampoSeparado[0],
            mes: dataCampoSeparado[1],
            ano: dataCampoSeparado[2]
        };
    
        const diasDoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        /* verifica se o ano é bissexto */
        if (data.ano % 4 === 0) {
            if (data.ano % 100 !== 0) {
                diasDoMes[2] = 29;
            } else {
                if (data.ano % 400 === 0) {
                    diasDoMes[2] = 29;
                }
            }
        }
    
        /* retira o primeiro 0 dos meses */
        if (data.mes[0] === '0') data.mes = data.mes[1];
        if (dataAtualSeparada[1][0] === '0') dataAtualSeparada[1] = dataAtualSeparada[1][1];
    
        const validacoes = [
            data.dia > diasDoMes[data.mes], 
            data.dia < 1, 
            data.mes < 1, 
            data.mes > 12, 
            data.ano > dataAtualSeparada[2],
            data.mes > dataAtualSeparada[1] && data.ano === dataAtualSeparada[2],
            data.dia > dataAtualSeparada[0] && data.mes === dataAtualSeparada[1] && data.ano === dataAtualSeparada[2],
            data.ano < "1900"
        ];
    
        /* se alguma validacao for true, cairá na condição do if */
        if (validacoes.some((validacao) => validacao)) {
            campo.setCustomValidity("Insira uma data válida.");
            campoAviso.innerText = erros.dataError;
            return;
        } else {
            campo.setCustomValidity("");
            campoAviso.innerText = "";
        }
    } else {
        campo.setCustomValidity("");
        campoAviso.innerText = "";
    }
}

export function verificaBotao(campo) {
    if (campo.value === "") {
        campo.setCustomValidity("O campo não pode estar vazio.");
        if (campo.id === "nome") avisoNome.innerText = "O campo não pode estar vazio.";
        if (campo.id === "nascimento") avisoData.innerText = "O campo não pode estar vazio.";
    }
}

export function verificaLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('aniversarios'));
    if (storage) {
        storage.forEach((aniversario) => {
            criaTabela(aniversario);
        });
    }
}