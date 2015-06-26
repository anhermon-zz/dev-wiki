(function(angular) {
    'use strict';
    angular.module('angMenu')
        .directive('angMenu', angMenu);
    ////////////
    function angMenu() {
        return {
            transclude: true,
            templateUrl: 'app/modules/menuModule/templates/menu.tpl.html',
            controller: 'menuController',
            controllerAs: 'mc',
            scope: {},
            link: function(scope, elem, attrs) {
                var vm = scope.mc;
            }
        };
    }
})(angular);
