(function(angular) {
    'use strict';
    angular.module('ang.content')
    .config(stateProviderConfig);
    ////////
    /* @ngInject */
    function stateProviderConfig ($stateProvider) {
        $stateProvider
            .state('home.articles', {
                url: '/articles',
                views: {
                    'center@':  {template: '<data-ang-content-main></data-ang-content-main>'}
                }
            });
    }
})(angular);
