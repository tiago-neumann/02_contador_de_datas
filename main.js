//OBS: estou comentando tudo isso, pois ainda estou aprendendo, facilitando caso eu precise revisitar o site

//Pega os elementos dos conteiners, pra depois ser possível meio que "mudar as páginas".
const conteinerData = document.querySelector('.conteiner_data');
const conteinerContador = document.querySelector('.conteiner_contador');

//Pega alguns elemntos utilizados pra que o usuário interaja com a página.
const input_data = document.getElementById('input_data');
const btn_enviar = document.getElementById('btn_enviar');
const btn_voltar = document.getElementById('voltar')
const erros = document.querySelector('.erros');

//Aqui é pego o a data do momento atual do usuário, criando uma const que recebe um new Date()(data de agora), depois utiliza um toISOString()(transforma a data em uma string em um formato padrão independente do navegador), transformando em uma string, e por fim usa a função split, para tirar o "T" que fica no começo da array, ou se preferir, string.
const agora = new Date().toISOString().split('T')[0];

//atribui a const agora no no atributo max, do input_data, limitando a possibilidade do usuário de selecionar uma data ainda não existente.
input_data.setAttribute('max', agora);


//Essa função tem o objetivo de 
function confirmarData(){
    const valorInput = input_data.value;
    const valorData = new Date(valorInput);
    const valorHoje = new Date();

    if(!valorInput || valorData > valorHoje){
        erros.textContent = "Insira uma data válida";
    } else {
        erros.textContent = "";
        conteinerData.style.display = 'none';
        conteinerContador.style.display = 'flex';
    }
}

function voltarPagina(){
    conteinerData.style.display = 'flex';
    conteinerContador.style.display = 'none';

    input_data.value = '';
}

function calcularData(){
    const dataAgora = new Date();
    const dataInserida = input_data.value;

    const [anoAgora, mesAgora, diaAgora] = dataAgora.toISOString().split('T')[0].split('-').map(Number);

    const [anoInserido, mesInserido, diaInserido] = dataInserida.split('-').map(Number);

    let anoFinal;
    let mesFinal;
    let diaFinal;

    anoFinal = anoAgora - anoInserido;
    mesFinal = mesAgora - mesInserido;
    diaFinal = diaAgora - diaInserido;

    if(mesFinal < 0){
        mesFinal += 12;
        anoFinal --;
    }

    if(diaFinal < 0){
        const diasMes = new Date(anoFinal, mesFinal, 0).getDate()
        diaFinal += diasMes;
        mesFinal --;
    }

    atualizarContador(anoFinal, mesFinal, diaFinal);
}

const anoDisplay = document.querySelector('#anos');
const mesDisplay = document.querySelector('#meses');
const diaDisplay = document.querySelector('#dias');

function atualizarContador(ano, mes, dia){
    anoDisplay.textContent = String(ano);
    mesDisplay.textContent = String(mes);
    diaDisplay.textContent = String(dia);
}

btn_enviar.addEventListener('click', function(){
    confirmarData();
    calcularData();
}  
)

btn_voltar.addEventListener('click', 
    voltarPagina
)