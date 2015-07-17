(function(angular) {
    'use strict';
    angular.module('ang.menu')
        .directive('angMenu', angMenu);
    ////////////
    function angMenu() {
        return {
            transclude: true,
            templateUrl: 'app/modules/menu.module/templates/menu.tpl.html',
            controller: 'menuController',
            controllerAs: 'mc',
            scope: {},
            link: function(scope, elem, attrs) {
                var vm = scope.mc;
            }
        };
    }
})(angular);
