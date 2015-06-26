(function(angular) {
    'use strict';
    /**
    * Registration form directive
    */
    angular.module('angSecurity')
    .directive('angSecurityRegister', angSecurityRegister);
    ////////////
    function angSecurityRegister() {
        return {
            transclude: false,
            controller: 'angRegisterCtrl',
            controllerAs: 'arc',
            scope: {},
            templateUrl :  'app/modules/securityModule/templates/register.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.asc;
            }
        };
    }
})(angular);
