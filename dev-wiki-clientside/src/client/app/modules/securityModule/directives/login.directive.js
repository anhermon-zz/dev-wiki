(function(angular) {
    'use strict';
    /**
    * Login form directive
    */
    angular.module('angSecurity')
    .directive('angSecurityLogin', angSecurityLogin);
    ////////////
    function angSecurityLogin() {
        return {
            transclude: false,
            controller: 'angLoginCtrl',
            controllerAs: 'alc',
            scope: {
                login : '@'
            },
            templateUrl :  'app/modules/securityModule/templates/login.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.alc;
            }
        };
    }
})(angular);
