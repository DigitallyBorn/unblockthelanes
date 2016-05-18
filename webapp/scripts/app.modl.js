(function () {
    'use strict';

    angular
        .module('app', [
            'templates',
            'ui.router',
            'ui.bootstrap'
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
  

    function routeConfig($urlRouterProvider, $stateProvider) {
        $stateProvider
          .state('lander', {
            url: '/',
            templateUrl: 'lander/index.html',
            controller: 'LanderCtrl as vm'
          })
          .state('map', {
            url: '/map',
            templateUrl: 'map/index.html',
            controller: 'MapCtrl as vm'
          });
      $urlRouterProvider.otherwise('/');
    }
})();