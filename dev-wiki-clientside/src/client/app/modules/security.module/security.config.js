(function(angular) {
    'use strict';
    angular.module('ang.security')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(angular);
