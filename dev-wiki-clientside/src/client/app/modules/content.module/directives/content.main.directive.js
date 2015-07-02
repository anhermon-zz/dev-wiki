(function(angular) {
    'use strict';
    angular.module('ang.content')
    .directive('angContentMain', angContentMain);
    ///////////////////
    function angContentMain() {
        return {
            replace: false,
            controller :   'angContentMainCtrl',
            controllerAs : 'amcc',
            templateUrl :  'app/modules/content.module/templates/main.tpl.html',
            link: function(scope, elem, attrs) {
                var vm = scope.amcc;
                console.log('flag');
            }
        };
    }
})(angular);
