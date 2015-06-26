(function(angular) {
    'use strict';
    /**
    * Present content by role
    */
    angular.module('angSecurity')
    .directive('angSecurityPermission', angSecurityPermission);
    ////////////
    function angSecurityPermission($timeout) {
        return {
            transclude: false,
            replace:    true,
            controller: 'angLoginCtrl',
            controllerAs: 'alc',
            template: '<div ng-include="alc.getDisplay()"/>',
            scope: {
                user:      '@',
                admin:     '@',
                anonymous: '@'
                /*other roles?*/
            },
            link: function(scope, elem, attrs, ctrl) {
                var vm = scope.alc;
                vm.getDisplay = getDisplay;
                //////////////////
                function getDisplay() {
                    var old = vm.display;
                    vm.display = (function() {
                        var role = vm.role;
                        switch (role) {
                            case 'admin' : return scope.admin;
                            case 'user'  : return scope.user;
                            default      : return scope.anonymous;
                        }
                    }());
                    if (vm.display !== old) {
                        elem.addClass('animated bounceIn');
                        $timeout(function() {
                            elem.removeClass('animated bounceIn');
                        }, 1000);
                    }
                    return vm.display;
                }
            }
        };
    }
})(angular);
