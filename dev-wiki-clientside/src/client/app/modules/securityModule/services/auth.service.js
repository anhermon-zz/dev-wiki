(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .service('authService', authService);
    /////////////////
    function authService($window, PubSub) {
        /*jshint validthis:true */
        var self = this;

        self.parseJwt    = parseJwt;
        self.saveToken   = saveToken;
        self.getToken    = getToken;
        self.isAuthed    = isAuthed;
        self.logout      = logout;
        self.getUsername = getUsername;
        self.getRole     = getRole;
        ///////////////////////////////
        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
        function saveToken(token) {
            $window.localStorage['jwtToken'] = token;
        }
        function getToken(token) {
            return $window.localStorage['jwtToken'];
        }
        function isAuthed() {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }
        function logout () {
            $window.localStorage.removeItem('jwtToken');
            PubSub.publish('event-user-logged-out');
        }
        function getUsername() {
            var jwt = getParsedJwt();
            if (!jwt) {
                return;
            }
            return jwt.username;
        }
        function getRole() {
            var jwt = getParsedJwt();
            if (!jwt) {
                return;
            }
            return jwt.role;
        }
        function getParsedJwt() {
            var jwt;
            if (!self.isAuthed()) {
                return;
            }
            jwt = self.getToken();
            if (!jwt || typeof jwt === 'undefined') {
                return;
            }
            return self.parseJwt(jwt);
        }
    }
})(angular);
