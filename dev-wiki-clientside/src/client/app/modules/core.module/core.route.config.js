(function(angular) {
    'use strict';
    angular.module('ang.core')
    .config(stateProviderConfig);
    ////////
    /* @ngInject */
    function stateProviderConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home')
                          .when('/home' , '/home/index');
        $stateProvider
            .state('home', {
                abstract: true,
                url: '/home',
                views: {
                    'nav':     {templateUrl: 'app/modules/core.module/templates/core.nav.tpl.html'}
                }
            })
            .state('home.index', {
                url: '/index'
            });
    }
})(angular);
