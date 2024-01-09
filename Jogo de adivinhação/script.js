//Variaveis globais
var paginaInicial = document.getElementById('pagina-inicial');
var paginaJogo = document.getElementById('pagina-jogo');
var paginaResultado = document.getElementById('pagina-resultado');
var paginaHistorico = document.getElementById('pagina-historico');
var paginaClassificacao = document.getElementById('pagina-classificacao');

let numeroAleatorio;
var tentativas;

var numeroDeJogadores = JSON.parse(localStorage.getItem('numeroDeJogadores'));
var qtdJogadores
    
if(numeroDeJogadores == null) {
    qtdJogadores = 0;
} else {
    qtdJogadores = numeroDeJogadores;
}

function avisoRecarregarPagina(event) {
    var paginaInicial = document.getElementById('pagina-inicial');

    if (paginaJogo.style.display === 'flex' || paginaHistorico.style.display === 'flex') {
        var resposta = confirm('Deseja recarregar a página?');
        if (resposta) {
            
        } else {
            event.returnValue = false;
        }
    }
}

window.addEventListener('beforeunload', avisoRecarregarPagina);
         
function gerarNumero() {
    return parseInt(Math.floor(Math.random() * 100));
}

function pressionarEnter(event) {
    if (event.key === 'Enter') {
        registrarNumero()
    }
}

function iniciarJogo() {

    //Iniciar a tela de jogo
    paginaInicial.style.display = 'none';
    paginaJogo.style.display = 'flex';
    paginaResultado.style.display = 'none';

    //Gerar um número aleatorio
    numeroAleatorio = gerarNumero();

    //Iniciar as tentativas em 0
    tentativas = 0;
}


function registrarNumero() {
    //Registrar o número escolhido pelo usuário
    var numero = document.getElementById('numero').value;
    console.log(numero);
    document.getElementById('numero').value = '';
    document.getElementById('numero').focus();

    //Função para escrever as tentativas no quadro 

    function adicionarParagrafo(texto) {

        document.getElementById('tentativa').innerText = texto;

        var novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = texto;
        
        var historico = document.getElementById('historico');
        historico.appendChild(novoParagrafo);
    }

    //Verificar o número escolhido pelo usuário 
    if(numero == numeroAleatorio) {

        paginaInicial.style.display = 'none';
        paginaJogo.style.display = 'none';
        paginaResultado.style.display = 'flex';
        paginaHistorico.style.display = 'none';

        tentativas++;


        if(tentativas == 1) {
            document.querySelector('label').innerText = (`Você conseguiu em ${tentativas} tentativa`);
        } else {
            document.querySelector('label').innerText = (`Você conseguiu em ${tentativas} tentativas`);
        }
       
    } else if (numero < numeroAleatorio) {

        adicionarParagrafo(`Você digitou ${numero}, o número secreto é MAIOR`)
        tentativas++;
    } else {

        adicionarParagrafo(`Você digitou ${numero}, o número secreto é MENOR`)
        tentativas++;
    }
}

function abrirHistorico() {
    paginaJogo.style.display = 'none';
    paginaHistorico.style.display = 'flex';
}

function fecharHistorico() {
    paginaJogo.style.display = 'flex';
    paginaHistorico.style.display = 'none';
}

function abrirClassificacao() {
    paginaInicial.style.display = 'none';
    paginaClassificacao.style.display = 'flex';

    qtdJogadores = JSON.parse(localStorage.getItem('numeroDeJogadores'));

    var tabela = document.querySelector('table');

    // Criar um vetor para armazenar os elementos
    var vetorElementos = [];

    for (var i = 0; i < qtdJogadores; i++) {
        // Obtém o jogador do localStorage com base no índice
        var jogador = JSON.parse(localStorage.getItem('jogador' + i));

        // Adiciona os elementos ao vetor
        vetorElementos.push(jogador);
    }

    function ordenarPorPropriedade(arrayDeObjetos, propriedade) {
        return arrayDeObjetos.sort(function (a, b) {
            return a[propriedade] - b[propriedade];
        });
    }

    // Corrigindo a chamada da função de ordenação
    var arrayOrdenado = ordenarPorPropriedade(vetorElementos, 'numeroTentativas');

    // Criação de todas as linhas fora do loop
    var linhas = [];

    for (var i = 0; i < qtdJogadores; i++) {
        linhas.push(tabela.insertRow());
    }

    // Dentro do loop para preencher as linhas da tabela
    for (var i = 0; i < qtdJogadores; i++) {
        var linha = linhas[i];
        var cell1 = linha.insertCell(0);
        var cell2 = linha.insertCell(1);
        var cell3 = linha.insertCell(2);

        // Adiciona conteúdo às células com base nos dados do vetorElementos
        cell1.innerHTML = i + 1 + 'º';
        cell2.innerHTML = arrayOrdenado[i].nome;
        cell3.innerHTML = arrayOrdenado[i].numeroTentativas; 
    }
}

function fecharClassificacao() {
    paginaInicial.style.display = 'flex';
    paginaClassificacao.style.display = 'none';

    var tabela = document.querySelector('table');

    var linhas = tabela.getElementsByTagName('tr');

   
    // Remover as trs (linhas) e não as ths (cabeçalhos)
    for (var i = linhas.length - 1; i > 0; i--) {
        
        tabela.deleteRow(i);
    

    }
}

function voltarInicio() {

    paginaInicial.style.display = 'flex';
    paginaJogo.style.display = 'none';
    paginaResultado.style.display = 'none';

    //Limpar os quadros e historico
    document.getElementById('tentativa').innerText = '';

    var paragrafos = document.querySelectorAll('#historico p');
    var historico = document.getElementById('historico');
    
    while (paragrafos.length > 0) {
        historico.removeChild(paragrafos[0]);
        paragrafos = document.querySelectorAll('#historico p'); 
    }

}

function salvarClassificacao() {

    var nome = document.getElementById('nome-jogador').value;
    var numeroTentativas = tentativas;

    var jogador = {nome, numeroTentativas};

    numeroDeJogadores = JSON.parse(localStorage.getItem('numeroDeJogadores'));
   
    if(numeroDeJogadores == null) {
        qtdJogadores = 0;
    } else {
        qtdJogadores = numeroDeJogadores;
    }

    localStorage.setItem('jogador' + qtdJogadores , JSON.stringify(jogador));
    

    numeroDeJogadores = qtdJogadores;

    if(numeroDeJogadores == 0) {
        numeroDeJogadores = qtdJogadores + 1;
    } else {
        numeroDeJogadores++;
    }

    localStorage.setItem('numeroDeJogadores', JSON.stringify(numeroDeJogadores));
    

    document.getElementById('nome-jogador').value = '';
    document.getElementById('nome-jogador').focus();

}
