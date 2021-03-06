angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Estados, ListaHistorico, $ionicPopup) {
  var alertPopup = $ionicPopup.alert({
    title: 'Atenção !',
    template: "Aplicativo elaborado para fins acadêmicos.<br/><br/> Todos os dados relacionados a opiniões dos candidatos não devem ser associados ao cenário político real."
  });
  $scope.estados = Estados.all();

  ListaHistorico.createDB();

  $scope.remove = function(estado) {
    Estados.remove(estado);
  };
})

.controller('HistoricoCtrl', function($scope, ListaHistorico, $state, $ionicPopup, $http) {
  ListaHistorico.createDB();
  ListaHistorico.all().then(function (results) {
    $scope.historicos = results;
    $.each($scope.historicos, function(key, value){
      ListaHistorico.all_resultados(value.id).then(function (results) { 
        $scope.historicos_resultado = Object.assign(value, results);
      });
    });
  });
  $scope.load_historicos = function(){
    ListaHistorico.all_dates().then(function (results) {
      $scope.historicos_datas = results;
    });
  }

  $scope.load_historicos();

  $scope.remover_historico = function(id){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Remover Histórico',
     template: 'Deseja realmente remover este histórico ?',
     cancelText: 'Cancelar'
    });

   confirmPopup.then(function(res) {
     if(res) { 
        ListaHistorico.destroy(id).then(function(){
          $scope.load_historicos();
          $state.transitionTo('tab.historico', {}, {reload: true, inherit: false, notify: true});
        });
     }
   });
  };

  $scope.respostas_historico = function(id, cargo){
    if($("#box-respostas-" + id).css('display') == 'none'){
      $(".box-respostas").hide();
      $("#box-respostas-" + id).css('display', 'table');
      ListaHistorico.all_respostas(id).then(function (results) {
        $scope.respostas_usuario = results;
      });

      // Array com perguntas
      $scope.perguntas = [];
      // Requisição com perguntas referentes a este cargo
      var ajaxRequest_respostas = $http.get("http://guiaeleitoral.esy.es/perguntas_cargo.php?cargo=" + cargo);
      // Populando array de perguntas com resultado
      ajaxRequest_respostas.success(function(data, status, headers, config){
        $scope.perguntas = data;
      });

      $("#box-respostas-" + id + " #loading-gif").hide();
      $("#box-respostas-" + id + " #tabela-respostas-usuario").css('display', 'table');
    }else{
      $("#box-respostas-" + id).hide();
    }
  }

  $scope.popup_pergunta = function(texto, indice){
    var indice_popup = indice + 1;
    var alertPopup = $ionicPopup.alert({
      title: 'Pergunta ' + indice_popup,
      template: texto
    });
  }

  $scope.resultados_historico = function(id, score_resultado_1, score_resultado_2, score_resultado_3, score_resultado_4, score_resultado_5, id_resultado_1, id_resultado_2, id_resultado_3, id_resultado_4, id_resultado_5){

    $scope.compativeis = [];
    var array_auxiliar = [];

    ListaHistorico.all_resultados(id).then(function (results) {
      $scope.resultados_usuario = results;
      $.each($scope.resultados_usuario, function( key, value ) {
        if(value.score > 0){
          array_auxiliar[value.score] = value.id_candidato.toString();
          $scope.compativeis.push(array_auxiliar);
          array_auxiliar = [];
        }
      });
      $state.go('tab.resultado-quiz', {'compativeis': $scope.compativeis});
    });
  }
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
     $scope.estado_nome_clicado = Estados.getUrl($stateParams.estado_url);
     $scope.cargos = [];
     var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/cargos.php?tipo="+$scope.estado_clicado.tipo);

     ajaxRequest.success(function(data, status, headers, config){
       $scope.cargos = data;
     });


    ajaxRequest.error(function(data, status, headers, config){
      alert("AJAX falhou !");
    });
})

.controller('TelaDecisaoCtrl', function($scope, $stateParams, $http) {
    $scope.parametros = $stateParams;
    var ajaxRequestcargo = $http.get("http://guiaeleitoral.esy.es/cargos_descricao.php?id="+$stateParams.cargo);

    ajaxRequestcargo.success(function(data, status, headers, config){
      $scope.cargos_descricao = data;
    });
    

})

.controller('ListaComparacaoCtrl', function($scope, $http, $stateParams, Estados){
    $scope.estado = $stateParams.estado;
    $scope.nome_estado = Estados.getUrl($scope.estado);
    $scope.cargo  = $stateParams.cargo;
   
    $scope.candidatos = [];

    var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos.php?estado="+$scope.nome_estado.sigla +"&cargo=" + $scope.cargo);
     
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

.controller('QuizCtrl', function($scope, $stateParams, $http, $state, $ionicSlideBoxDelegate, ListaHistorico, $q, $rootScope, Estados) {
  // Abre banco de dados local
  ListaHistorico.createDB();
  // Função que escuta quando as respostas são alteradas para paginar ou marcar as páginações
  angular.element(document).ready(function(){
    jQuery(".item-radio").click(function(){
      input_indice = $(this).find("input").attr('name').match(/[0-9]{1,}/);
      if($(this).hasClass('active-radio') == true){
        $(this).removeClass('active-radio');
        $(this).find("input").prop('checked',false);
        $("#circle-pagínator-"+input_indice).removeClass("circle-pager-active").addClass("circle-pager");
      }else{
        $(this).addClass('active-radio');
        $(this).find("input").attr('checked', 'checked');
        $("#circle-pagínator-"+input_indice).removeClass("circle-pager").addClass("circle-pager-active");
        $ionicSlideBoxDelegate.next();
      }
    });
  });

  // Função para captar o indice do slide quando trocar
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  // Função para pular para o proximo slide
  $scope.slideNext = function() {
    $ionicSlideBoxDelegate.next();
  };

  // Função para retornar ao último slide
  $scope.slidePrevious = function() {
    $ionicSlideBoxDelegate.previous();
  };
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
  var estado_sigla = Estados.getUrl($stateParams.estado).sigla;
  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/select_quiz.php?cargo=" + $stateParams.cargo + "&estado=" + estado_sigla);

  var score_compativeis_historico = [];
  var id_compativeis_historico = [];

  ajaxRequest.success(function(data, status, headers, config){
    // Populando array de respostas com resultado
    $scope.respostas_candidatos = data;

    // Função que é chamada ao finalizar o QUIZ
    $scope.quiz_perguntas = function(tamanho_quiz){
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
        for(i = 0; i < tamanho_quiz; i++){
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

      // Fuñção que trata os valores de score e id do candidato individualmente para armazenar no histórico 
      $.each($scope.compativeis, function( key, value ) {
        var j = 0;
        for(var i in this){
          score_compativeis_historico.push(i);
        }

        for (var i = 0; i < value.length; i++) {
          if (value[i]) {
            id_compativeis_historico.push(value[i]);
          }
        }
      });
      var estado_nome = Estados.getUrl($stateParams.estado).nome;

      var data_historico = horario_historico();

      function horario_historico(){
        var d = new Date();
        return d.toLocaleDateString();
      }
      // Redireciona para a tela dos compativeis
      //location.href = "#/tab/resultado-quiz/";
      ListaHistorico.create($stateParams.cargo, $stateParams.cargo_descricao, $stateParams.estado, estado_nome, data_historico);
      ListaHistorico.lastHistorico().then(function (results) {
        var id_auxiliar = results;

        // Guardando as respsotas do usuário no histórico
        for(i = 0; i < tamanho_quiz; i++){
          ListaHistorico.createRespostas(id_auxiliar[0].id ,i+1, $("#pergunta-"+i+" input:checked").val());
        }


        for(i = 0; i < 5; i++){
          ListaHistorico.createResultado(id_auxiliar[0].id, id_compativeis_historico[i], score_compativeis_historico[i]);
        }

      });

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
    // Evento para digitação no campo de busca
    $("#input-busca").keyup(function(){
      valor_input = $("#input-busca").val();
      filtro_tamanho = valor_input.length;
      if(filtro_tamanho >= 2){
        // Setando o valor do que foi digitado
        filtro = $("#input-busca").val();

        $scope.candidatos = [];
        $scope.data = {"result" : [], "search" : []};
        var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos_all.php?filtro="+filtro.toLowerCase());

        ajaxRequest.success(function(data, status, headers, config){
          $scope.candidatos = data;

          // Transformando o retorno do requisição AJAX em Array
          var array = $.map($scope.candidatos, function(value, index) {
            return [value];
          });


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
      }
    });
    // Evento para digitação no campo de busca
    $("#input-busca").keypress(function(){
      valor_input = $("#input-busca").val();
      filtro_tamanho = valor_input.length;
      if(filtro_tamanho >= 2){
        // Setando o valor do que foi digitado
        filtro = $("#input-busca").val();

        $scope.candidatos = [];
        $scope.data = {"result" : [], "search" : []};
        var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos_all.php?filtro="+filtro.toLowerCase());

        ajaxRequest.success(function(data, status, headers, config){
          $scope.candidatos = data;

          // Transformando o retorno do requisição AJAX em Array
          var array = $.map($scope.candidatos, function(value, index) {
            return [value];
          });


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
      }
    });
})
.controller('PerfilCtrl', function($scope, $stateParams, $http, Estados) {
  $scope.perfil = [];

  var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/perfil.php?id="+$stateParams.candidato);

  ajaxRequest.success(function(data, status, headers, config){
    $scope.perfil = data;
    $scope.estado_candidato = Estados.getSigla($scope.perfil.estado).nome;

    $scope.vices = [];
    var ajaxRequest_vices = $http.get("http://guiaeleitoral.esy.es/perfil_vices.php?id="+$scope.perfil.id + "&num=" + $scope.perfil.numero + "&estado=" + $scope.perfil.estado);

    ajaxRequest_vices.success(function(data, status, headers, config){
      $scope.vices = data;
      $scope.numero_vices = Object.keys($scope.vices).length;
    });

  });

})

.controller('ErroConexaoCtrl', function($scope) {

})

.controller('TabCtrl', function($scope, $state) {
  $scope.update_state = function(){
    $state.transitionTo('tab.historico', {}, {reload: true, inherit: false, notify: true});
  }
});