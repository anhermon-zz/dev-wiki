(function(angular) {
    'use strict';
    angular.module('angCore')
    .config(stateProviderConfig);
////////
    /* @ngInject */
    function stateProviderConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    'nav':     {templateUrl: 'app/modules/coreModule/templates/core.nav.tpl.html'},
                    'center':  {template: ''}
                    
                }
            })
            .state('login', {
                url: '/auth',
                views: {
                    'nav':     {templateUrl: 'app/modules/coreModule/templates/core.nav.tpl.html'},
                    'center':  {template: '<ang-security-login></ang-security-login>'}
                }
            }); 
        
        $urlRouterProvider.otherwise('/');
    }
})(angular);
