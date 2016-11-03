// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.cargos', {
      url: '/cargos/:estado',
      views: {
        'tab-home': {
          templateUrl: 'templates/cargos.html',
          controller: 'CargosCtrl'
        }
      }
    })
    .state('tab.tela-decisao', {
      url: '/tela-decisao/:estado/:cargo',
      views: {
        'tab-home': {
          templateUrl: 'templates/tela-decisao.html',
          controller: 'TelaDecisaoCtrl'
        }
      }
    })
    .state('tab.lista-comparacao', {
      url: '/lista-comparacao/:estado/:cargo',
      views: {
        'tab-home': {
          templateUrl: 'templates/lista-comparacao.html',
          controller: 'ListaComparacaoCtrl'
        }
      }
    })
    .state('tab.tabela-comparacao', {
      url: '/tabela-comparacao/:primeiro_candidato/:segundo_candidato',
      views: {
        'tab-home': {
          templateUrl: 'templates/tabela-comparacao.html',
          controller: 'TabelaComparacaoCtrl'
        }
      }
    })
    .state('tab.quiz', {
      url: '/quiz/:cargo',
      views: {
        'tab-home': {
          templateUrl: 'templates/quiz.html',
          controller: 'QuizCtrl'
        }
      }
    })
    .state('tab.perfil', {
      url: '/perfil/:candidato',
      views: {
        'tab-home': {
          templateUrl: 'templates/perfil.html',
          controller: 'PerfilCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
