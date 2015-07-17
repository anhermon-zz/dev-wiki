(function(angular) {
    'use strict';
    angular.module('ang.security')
    .config(stateProviderConfig);
    ////////
    /* @ngInject */
    function stateProviderConfig ($stateProvider) {
        $stateProvider
            .state('home.login', {
                url: '/auth',
                views: {
                    'center@':  {template: '<data-ang-security-login></data-ang-security-login>'}
                }
            })
            .state('home.register', {
                url: '/register',
                views: {
                    'center@':  {template: '<data-ang-security-register></data-ang-security-register>'}
                }
            });
    }
})(angular);
