const input_data = document.getElementById('input_data');
const botao_enviar = document.getElementById('botao_enviar');
const voltar = document.getElementById('voltar');

const conteiner_data = document.querySelector('.conteiner_data');
const conteiner_contador = document.querySelector('.conteiner_contador');
const erros = document.querySelector('.erros')

const agora =  new Date();
const dataLocal = agora.toLocaleDateString('en-CA');
input_data.setAttribute('max', dataLocal);

function verificarErros(){
    valor_input = input_data.value

    if(valor_input === null || valor_input === ""){
        erros.textContent = "Insira um valor na caixa!"
    }
}

botao_enviar.addEventListener('click', () => {
    verificarErros();
})

voltar.addEventListener('click', () => {
    conteiner_data.style.display = 'flex';
    conteiner_contador.style.display = 'none';
})