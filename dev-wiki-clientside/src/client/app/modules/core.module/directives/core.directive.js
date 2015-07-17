(function(angular) {
    'use strict';
    angular.module('ang.core')
    .directive('angCore', angCore);
    ///////////////////
    function angCore() {
        return {
            transclude:    true,
            controller :   'angCoreController',
            controllerAs : 'acc',
            templateUrl :  'app/modules/core.module/templates/core.tpl.html',
            scope: {
                title: '@'
            },
            link: function(scope, elem, attrs) {
                var vm = scope.acc;
                vm.title = scope.title;
                /**
                elem.bind('mouseover', function() {
                    elem.css('background-color', 'red');
                });
                elem.bind('mouseout', function() {
                    elem.css('background-color', 'white');
                });
                */
            }
        };
    }
})(angular);
