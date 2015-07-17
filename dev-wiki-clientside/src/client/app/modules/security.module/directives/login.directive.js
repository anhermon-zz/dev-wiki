(function(angular) {
    'use strict';
    /**
    * Login form directive
    */
    angular.module('ang.security')
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
            templateUrl :  'app/modules/security.module/templates/login.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.alc;
            }
        };
    }
})(angular);
