angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Estados) {
  $scope.estados = Estados.all();
  $scope.remove = function(estado) {
    Estados.remove(estado);
  };
})

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

.controller('QuizCtrl', function($scope) {

});


