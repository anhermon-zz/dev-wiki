(function(angular) {
    'use strict';
    /*jshint validthis:true */
    function angCore() {
        return {
            transclude:    true,
//            replace :      true,
            controller :   'angCoreController',
            controllerAs : 'acc',
            templateUrl :  'app/modules/coreModule/templates/core.tpl.html',
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
    //////////////
    angular.module('angCore')
    .directive('angCore', angCore);
})(angular);
