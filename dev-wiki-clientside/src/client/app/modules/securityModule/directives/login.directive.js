(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .directive('angSecurityLogin', angSecurityLogin);
////////////
    function angSecurityLogin() {
        return {
            transclude: false,
            controller: 'angSecurityCtrl',
            controllerAs: 'asc',
            scope: {
                login : '@'
            },
            templateUrl :  'app/modules/securityModule/templates/login.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.asc;
            }
        }
    }
})(angular);
