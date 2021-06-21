var timerId = null; //variavel que armazena a chamada da função timeout

function iniciaJogo(){
    
   var url = window.location.search;

   var nivel_jogo = url.replace('?','');

   var tempo_segundos = 0;

   if(nivel_jogo==1){

    tempo_segundos = 120;

}
   if(nivel_jogo==2){

    tempo_segundos = 60;

}
    if(nivel_jogo==3){

    tempo_segundos = 30;    

}

//inserindo segundos na div id cronometro
document.getElementById('cronometro').innerHTML = tempo_segundos;


//quantidade de baloes
var quant_baloes = 60;

cria_baloes(quant_baloes);

//quantidade de balões inteiros será impresso pela variavel quant_baloes
document.getElementById('baloes_inteiros').innerHTML = quant_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_segundos + 1)
   

}


//recebe o p
function contagem_tempo(segundos) {

    segundos = segundos-1;

    if(segundos ==-1){

        game_over();
        clearTimeout(timerId) // para a execução da função do setTimeout
        return false;

    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout('contagem_tempo('+segundos+')', 1000);
    //a cada um segundo vai chamar a função e passar o parametro de segundos
    

}

function game_over() {
    
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo.')

}

function cria_baloes(quant_baloes) {

    //for para criação dos baloes
    for(i = 1; i <= quant_baloes;i++){

        //criando a tag de imagen
        var balao = document.createElement('img');

        //atribuindo strings a variavel que criará a tag de imagen 
        balao.src= "imagens/balao_azul_pequeno.png";

        //ajustando o posicionamento com a tag style
        balao.style.margin = '10px'

        balao.id = 'b' +i;

        balao.onclick = function(){ estourar(this);  }


        //indicando onde será criado as imagens dos balões
        document.getElementById('cenario').appendChild(balao);

    }

    function estourar(e) {

        var id_balao = e.id

        document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';//modificando a img do balão para o estourado;
        
        pontuacao (-1)

    }

    function pontuacao(acao){

        var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
        var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

        baloes_inteiros = parseInt(baloes_inteiros);
        baloes_estourados = parseInt(baloes_estourados);

        baloes_inteiros = baloes_inteiros + acao;
        baloes_estourados = baloes_estourados - acao;

        document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
        document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

        situacao_jogo(baloes_inteiros);
        
    }

    function situacao_jogo(baloes_inteiros) {

        if(baloes_inteiros == 0){

            alert('Parabéns, você conseguiu estourar todos os balões a tempo');

            parar_jogo()

        }
        
    }

    function parar_jogo() {
        
        clearTimeout(timerId)

    }
    
}