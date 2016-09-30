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

.controller('CargosCtrl', function($scope, $http) {

     $scope.cargos = [];

     var ajaxRequest = $http.get("http://guiaeleitoral.esy.es/cargos.php");

     ajaxRequest.success(function(data, status, headers, config){
       $scope.cargos = data;
     });

    ajaxRequest.error(function(data, status, headers, config){
      alert("AJAX falhou !");
    });
});
