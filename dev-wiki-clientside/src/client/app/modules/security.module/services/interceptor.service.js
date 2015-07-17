(function(angular) {
    'use strict';
    angular.module('ang.security')
    .factory('authInterceptor', authInterceptor);
    /////////////////
    function authInterceptor(API, authService) {
        return {
            request: request
        };
        /////////////////
        function request(config) {
            var token = authService.getToken();
            if (config.url.indexOf(API) === 0 && token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }
})(angular);
