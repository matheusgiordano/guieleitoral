// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope) {
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

    $rootScope.$on('$stateChangeStart', function (event) {
      if(navigator.connection.type == Connection.NONE) {
        alert('There is no internet connection available');
        event.preventDefault();
      }
    });
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
  .state('tab.historico', {
      url: '/historico',
      views: {
        'tab-historico': {
          templateUrl: 'templates/tab-historico.html',
          controller: 'HistoricoCtrl'
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
      url: '/quiz/:estado/:cargo',
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
    })
    .state('tab.resultado-quiz', {
      url: '/resultado-quiz/',
      params: {
        'compativeis': []
      },
      views: {
        'tab-home': {
          templateUrl: 'templates/resultado.html',
          controller: 'ResultadoQuizCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
