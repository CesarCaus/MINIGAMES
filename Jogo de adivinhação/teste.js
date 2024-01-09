
function adicionarParagrafo(quadro, texto) {
    var novoParagrafo = document.createElement('p');
    novoParagrafo.textContent = texto;
    quadro.appendChild(novoParagrafo);
}

function gerarNumero() {
    let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    var tentativas = 0;
}

console.log(numeroAleatorio);

function adivinharNumero() {

    var numero = parseInt(document.getElementById('input-jogo-adivinhacao').value);
    document.getElementById('input-jogo-adivinhacao').value = '';
    var quadroResultado = document.getElementById('quadro-jogo-01');

    if (numero === numeroAleatorio) {

        tentativas++;
        var paragrafos = quadroResultado.querySelectorAll('p');
        var mensagemVitoria = document.getElementById('vitoria-jogo-01');


        paragrafos.forEach(function(paragrafo) {
            quadroResultado.removeChild(paragrafo);
        })
       
        mensagemVitoria.style.display = 'block';
        document.getElementById('botao-jogar-novamente-01').style.display = 'block'
        adicionarParagrafo(mensagemVitoria, `Você conseguiu em ${tentativas} tentativas`);
        tentativas = 0;

        document.getElementById('input-jogo-adivinhacao').readonly = true;


    } else if (numero > numeroAleatorio) {
        // Adicionar parágrafo informando que o número é MENOR
        adicionarParagrafo(quadroResultado, `Você digitou o número ${numero}, o número secreto é MENOR.`);
        tentativas++;
    } else {
        // Adicionar parágrafo informando que o número é MAIOR
        adicionarParagrafo(quadroResultado, `Você digitou o número ${numero}, o número secreto é MAIOR.`);
        tentativas++;
    }
  
}


