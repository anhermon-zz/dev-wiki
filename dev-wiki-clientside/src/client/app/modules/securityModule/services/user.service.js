(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .service('userService', userService);
    /////////////////
    function userService($http, API) {
        /*jshint validthis:true */
        var self = this;

        self.login     = login;
        self.register  = register;
        ///////////////////////////////
        function login(user) {
            return $http({
                method: 'POST',
                url:    API + '/users/login',
                data:   user
            });
        }
        function register(user) {
            return $http({
                method: 'POST',
                url:    API + '/users/register',
                data:   user
            });
        }
    }
})(angular);
