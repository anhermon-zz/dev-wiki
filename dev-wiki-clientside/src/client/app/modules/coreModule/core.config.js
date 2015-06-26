(function(angular) {
    'use strict';
    angular.module('angCore')
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
                    'nav':     {templateUrl: 'app/modules/coreModule/templates/core.nav.tpl.html'}
                }
            })
            .state('home.index', {
                url: '/index'
            })
            .state('home.login', {
                url: '/auth',
                views: {
                    'center@':  {template: '<ang-security-login></ang-security-login>'}
                }
            })
            .state('home.register', {
                url: '/register',
                views: {
                    'center@':  {template: '<ang-security-register></ang-security-register>'}
                }
            });
    }
})(angular);
