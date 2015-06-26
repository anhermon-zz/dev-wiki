(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(angular);
