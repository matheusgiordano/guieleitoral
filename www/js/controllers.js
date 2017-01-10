angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Estados, ListaHistorico) {
  $scope.estados = Estados.all();

  $scope.remove = function(estado) {
    Estados.remove(estado);
  };
})

.controller('HistoricoCtrl', function($scope) {
})

/*
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/
.controller('CargosCtrl', function($scope, $http, $stateParams, Estados) {
     $scope.estado_clicado = Estados.get($stateParams.estado);
     $scope.cargos = [];
     var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/cargos.php?tipo="+$scope.estado_clicado.tipo);

     ajaxRequest.success(function(data, status, headers, config){
       $scope.cargos = data;
     });


    ajaxRequest.error(function(data, status, headers, config){
      alert("AJAX falhou !");
    });
})

.controller('TelaDecisaoCtrl', function($scope, $stateParams) {
    $scope.parametros = $stateParams;
})

.controller('ListaComparacaoCtrl', function($scope, $http, $stateParams){
    $scope.estado = $stateParams.estado;
    $scope.cargo  = $stateParams.cargo;
   
    $scope.candidatos = [];

    var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos.php?estado="+$scope.estado+"&cargo=" + $scope.cargo);
     
    ajaxRequest.success(function(data, status, headers, config){
      $scope.candidatos = data;
    });

   $scope.candidatos_comparacao = [];

   $scope.candidatos_selecionados = function(){
     var n = $("input:checkbox:checked").length;

     if(n == 2){
       $("#comparar").show();
       $("input:checkbox").not(":checked").attr("disabled", true);
     }
     else{
       $("input:checkbox").not(":checked").attr("disabled", false);
     }
   }

   $scope.candidatos_form = function(){
      var candidatos = [];
      candidatos = $("input:checkbox:checked").toArray();
      primeiro_candidato = candidatos[0].value;
      segundo_candidato = candidatos[1].value;
      location.href = "#/tab/tabela-comparacao/"+ primeiro_candidato+ "/" + segundo_candidato;
   }
})

.controller('TabelaComparacaoCtrl', function($scope, $stateParams, $http){
  $scope.concorrentes = [];
  $scope.respostas    = [];
 
  /* Busca dos candidatos comparados */ 
  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/comparacao.php?primeiro_candidato=" + $stateParams.primeiro_candidato + "&segundo_candidato=" + $stateParams.segundo_candidato);
  
  ajaxRequest.success(function(data, status, headers, config){
    $scope.concorrentes = data;
  });

  /* Busca das respostas dos candidatos comparados */ 
  
  var ajaxRequest_respostas = $http.get("http://guiaeleitoral.esy.es/tabela-comparativa.php?primeiro_candidato=" + $stateParams.primeiro_candidato + "&segundo_candidato=" + $stateParams.segundo_candidato);

  ajaxRequest_respostas.success(function(data, status, headers, config){
    $scope.respostas = data;
  });

})

.controller('QuizCtrl', function($scope, $stateParams, $http, $state) {
  angular.element(document).ready(function(){
    jQuery(".item-radio").click(function(){
      if($(this).hasClass('active-radio') == true){
        $(this).removeClass('active-radio');
        $(this).find("input").prop('checked',false);
      }else{
        $(this).addClass('active-radio');
        $(this).find("input").attr('checked', 'checked');
      }
    });
  });
  // Array com perguntas
  $scope.perguntas = [];
  // Requisição com perguntas referentes a este cargo
  var ajaxRequest_respostas = $http.get("http://guiaeleitoral.esy.es/perguntas_cargo.php?cargo=" + $stateParams.cargo);
  // Populando array de perguntas com resultado
  ajaxRequest_respostas.success(function(data, status, headers, config){
    $scope.perguntas = data;
  });
  // Array com respostas
  $scope.respostas_candidatos = [];
  // Requisição com respostas dos candidatos deste cargo e deste estado
  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/select_quiz.php?cargo=" + $stateParams.cargo + "&estado=" + $stateParams.estado);

  ajaxRequest.success(function(data, status, headers, config){
    // Populando array de respostas com resultado
    $scope.respostas_candidatos = data;

    // Função que é chamada ao finalizar o QUIZ
    $scope.quiz_perguntas = function(){
      $scope.compativeis = [];
      // Iterator que vai rodar a cada retorno de candidatos(key) com suas respectivas respostas(values)
      $.each($scope.respostas_candidatos, function( key, value ) {
        // contador de respostas compativeis
        var contador_compativeis = 0;
        // array que guarda o key(quantidade de respostas compativeis) e o value(id do candidato)
        var arr_compativeis = new Array();

        // Inverte o array pois os últimos valores da consulta estarão ordenados no final do array
        value.reverse();

        // Iterator que verificará se o valor da pergunta na tela é compativel com o valor da resposta do candidato, e incrementa 1 ao 
        // contador
        for(i = 0; i < 10; i++){
          if(value[i] == $("#pergunta-"+i+" input:checked").val()){
            contador_compativeis = contador_compativeis + 1;
          }
        }
        // Coloca um array no formato quantidade de compativeis e id do candidato, Ex: 7: [1], onde 7 é o número de opiniões compativeis
        // e 1 é o id do candidato comparado
        arr_compativeis[contador_compativeis] = key;
        // Aplica esse array ao final de um array do escopo de compativeis
        $scope.compativeis.push(arr_compativeis);
      });
      // Ordena os arrays dentro dos compativeis para que pegue sempre os mais compativeis primeiro
      $scope.compativeis.sort(function(a, b){
        return Object.keys(a)[0] - Object.keys(b)[0];
        //return a > b;
      });
      // Inverte para pegar os primeiros com mais score
      $scope.compativeis.reverse();
      // Deixa apenas os 5 primeiros elementos dentro do array e descarta os demais
      $scope.compativeis.splice(5);
      // Redireciona para a tela dos compativeis
      //location.href = "#/tab/resultado-quiz/";

      $state.go('tab.resultado-quiz', {'compativeis': $scope.compativeis});
    };
  });
})

.controller('ResultadoQuizCtrl', function($scope, $stateParams, $http) {
  // Recebe parametros dos compativeis
  $scope.compativeis = $stateParams.compativeis;

  //Função encarregada de limpar os valores null
  function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }
  // Variável encarregado de retornar para a tela o array de candidatos
  $scope.compativeis_consulta = [];
  // Timer para delay de cada requisição ajax
  var timer = 1100;

  // Laço para capturar os dados de cada id de candidato que foi retornado como compativel
  $.each($scope.compativeis, function( key, value ) {
    // Laço encarregado de pegar o score deste candidato que está sendo listado
    for(var i in this){
      var score = {"score": i};
    }
    // limpando o array com os caracteres ou valores null
    value = cleanArray(value);

    // Delay para o timer entre as requisições ajax
    function delay(){
      // Requisição para buscar o candidato
      var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/perfil.php?id="+value);
     
      ajaxRequest.success(function(data, status, headers, config){
        // Preenchendo os valores do candidato e dando merge ao score
        data_collect = $.extend(data, score);
        // Aplicando ao final do array o candidato que está sendo consultado nesta instância do laço
        $scope.compativeis_consulta = $scope.compativeis_consulta.concat(data);
      });
    }
    // Delay para a função
    setTimeout(delay, timer);
    timer += 1100;
  }); 
})  

.controller('FixaCtrl', function($scope, $stateParams, $http, $q, $timeout) {
  $scope.candidatos = [];
  $scope.data = {"result" : [], "search" : []};
  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos_all.php");

  ajaxRequest.success(function(data, status, headers, config){
    $scope.candidatos = data;

    // Transformando o retorno do requisição AJAX em Array
    var array = $.map($scope.candidatos, function(value, index) {
      return [value];
    });

    // Evento para digitação no campo de busca
    $("#input-busca").keyup(function(){
      // Setando o valor do que foi digitado
      filtro = $("#input-busca").val();

      // Criando a busca de candidatos
      var searchCandidatos = function(searchFilter) {
        // Instnaciando variável de consulta Angular
        var deferred = $q.defer();

        // Função da busca que vai comparar cada letra se existe um candidato que contêm aquela string
        function matcheBusca (candidato) {
	    	  if(candidato[1].toLowerCase().indexOf(filtro.toLowerCase()) !== -1 ) return true;
	       };

        // Filtra dentro do array e retorn dentro da variável "matches" somente aqueles candidatos compativeis a string digitada
        var matches = array.filter(matcheBusca);

        // Função de timeout que vai resolver e retornar os dados a cada instância de tempo
        $timeout( function(){
          deferred.resolve(matches);
        }, 100);
          return deferred.promise;
      }

      // Função que vai jogar os encontrados dentro de uma variável "result"
      searchCandidatos($scope.data.search).then(
        function(matches){
          $scope.data.result = matches;
        }
      );
    });
    // Evento para digitação no campo de busca
    $("#input-busca").keypress(function(){
      // Setando o valor do que foi digitado
      filtro = $("#input-busca").val();

      // Criando a busca de candidatos
      var searchCandidatos = function(searchFilter) {
        // Instnaciando variável de consulta Angular
        var deferred = $q.defer();

        // Função da busca que vai comparar cada letra se existe um candidato que contêm aquela string
        function matcheBusca (candidato) {
          if(candidato[1].toLowerCase().indexOf(filtro.toLowerCase()) !== -1 ) return true;
         };

        // Filtra dentro do array e retorn dentro da variável "matches" somente aqueles candidatos compativeis a string digitada
        var matches = array.filter(matcheBusca);

        // Função de timeout que vai resolver e retornar os dados a cada instância de tempo
        $timeout( function(){
          deferred.resolve(matches);
        }, 100);
          return deferred.promise;
      }

      // Função que vai jogar os encontrados dentro de uma variável "result"
      searchCandidatos($scope.data.search).then(
        function(matches){
          $scope.data.result = matches;
        }
      );
    });
  });
})
.controller('PerfilCtrl', function($scope, $stateParams, $http) {
  $scope.perfil = [];

  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/perfil.php?id="+$stateParams.candidato);

  ajaxRequest.success(function(data, status, headers, config){
    $scope.perfil = data;
  });

});