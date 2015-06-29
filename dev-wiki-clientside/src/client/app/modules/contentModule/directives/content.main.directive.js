(function(angular) {
    'use strict';
    angular.module('angContent')
    .directive('angContentMain', angContentMain);
    ///////////////////
    function angContentMain() {
        return {
            replace: false,
            controller :   'angContentMainCtrl',
            controllerAs : 'amcc',
            templateUrl :  'app/modules/contentModule/templates/main.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.amcc;
                console.log('flag');
            }
        };
    }
})(angular);
