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
//     console.log($scope);
     $scope.cargos = [];
     var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/cargos.php?tipo="+$scope.estado_clicado.tipo);

     ajaxRequest.success(function(data, status, headers, config){
       $scope.cargos = data;
     });

//    console.log(Object.keys($scope.cargos));

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
   
//    console.log($scope);
    $scope.candidatos = [];

    var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/candidatos.php?estado="+$scope.estado+"&cargo=" + $scope.cargo);
     
    ajaxRequest.success(function(data, status, headers, config){
      $scope.candidatos = data;
    });

   var count = 0;

   $scope.candidatos_selecionados = function(){
     count = count + 1;
     if(count == 2){
       $("#comparar").show();
     }
     if(count > 2){
       alert("Selecione apenas dois candidatos para a comparação !");
     }
     console.log(count);
   }

   console.log($scope.candidatos);
});


