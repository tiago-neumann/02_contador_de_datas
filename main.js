//OBS: estou comentando tudo isso, pois ainda estou aprendendo, facilitando caso eu precise revisitar o site, nesse caso comecei a interagir com datas

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


//Essa função tem o objetivo de verificar se a data é possível, além de alterar a tela.
function confirmarData(){
    //como o nome já diz, pega o valor do input.
    const valorInput = input_data.value;
    //transforma o valor do input em tipo Date.
    const valorData = new Date(valorInput);
    //pega a data de hoje.
    const valorHoje = new Date();

    //verifica se o valor do input não é nulo/inválido e se a data é inexistente.
    if(!valorInput || valorData > valorHoje){
        erros.textContent = "Insira uma data válida";
    } else {
        //se ele seguir todas as regras a linha de erros fica nula, e os displays mudam para haver uma "mudança de páginas".
        erros.textContent = "";
        conteinerData.style.display = 'none';
        conteinerContador.style.display = 'flex';
    }
}

//essa função serve para retornar a página de inserir datas.
function voltarPagina(){
    conteinerData.style.display = 'flex';
    conteinerContador.style.display = 'none';

    //deixa o valor do input zerado para uma nova inserção de dados.
    input_data.value = '';
}


//Aqui ele fará todo o calculo para que as datas sejam exibidas.
function calcularData(){

    //pega a data de agora.
    const dataAgora = new Date();

    //pega o valor inserido no input.
    const dataInserida = input_data.value;

    //Aqui usa um método interessante, pois ele cria uma array a partir da data de agora(dataAgora), depois utiliza o toISOString lá do começo para transformar em string, tirando o "T" do começo e dividindo os dados de dentro da array a partir do split('-'), e por fim trnasformando todos os dados da array em tipo Number por meio da função map.
    const [anoAgora, mesAgora, diaAgora] = dataAgora.toISOString().split('T')[0].split('-').map(Number);

    //faz a mesma coisa do de cima, mas sem precisar formatar.
    const [anoInserido, mesInserido, diaInserido] = dataInserida.split('-').map(Number);

    //definimos as variaveis que representarão os dados finais a serem apresentados ao usuário.
    let anoFinal;
    let mesFinal;
    let diaFinal;

    //calculo basico, subtraindo as datas de agora com as inseridas.
    anoFinal = anoAgora - anoInserido;
    mesFinal = mesAgora - mesInserido;
    diaFinal = diaAgora - diaInserido;

    //ajuste de erros, no caso ele verifica se o valor final do mes é negativo, e corrige isso somando mais 12(meses do ano) a variavel e subtraindo um do ano final(o anoFinal não tem a possibilidade de ser negativo, pois já foi bloqueado de se inserir datas ainda inexistente antes).
    if(mesFinal < 0){
        mesFinal += 12;
        anoFinal --;
    }

    //ajuste de erros, no caso é para verificar se o dia final for negativo, criando uma const(diasMes), que cria uma nova data, fixando o anoFinal o mesFinal e deixando o diaFinal como zero, permitindo que com o getDate(), diasMes pegue o valor máximo de cada mês, tudo isso por conta dessa variação de cada mês ter 30 ou 31 dias.
    if(diaFinal < 0){
        const diasMes = new Date(anoFinal, mesFinal, 0).getDate()
        diaFinal += diasMes;
        mesFinal --;
    }

    //função de atualizar o contador de datas.
    atualizarContador(anoFinal, mesFinal, diaFinal);
}

//Pega os elementos do HTML para poder altera-los de acordo com o valor final de cada data.
const anoDisplay = document.querySelector('#anos');
const mesDisplay = document.querySelector('#meses');
const diaDisplay = document.querySelector('#dias');

//Função de atualização de elementos a partir do textContent, nada demais. OBS: tem só esse négocio de transformar as datas em string, pois elas tinham virado Number para ser realizado calculos, mas era possível utilizar o `${}` também.
function atualizarContador(ano, mes, dia){
    anoDisplay.textContent = String(ano);
    mesDisplay.textContent = String(mes);
    diaDisplay.textContent = String(dia);
}

//Aqui é aplicado o addEventListener pra aplicar as funções ao interagir com o site.
btn_enviar.addEventListener('click', function(){
    confirmarData();
    calcularData();
}  
)

btn_voltar.addEventListener('click', 
    voltarPagina
)