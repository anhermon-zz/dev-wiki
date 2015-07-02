(function() {
    'use strict';
    var directiveId = 'routeTraverse';
    angular.module('ang.core')
    .directive(directiveId, directiveFn);
    ///////////////////
    function directiveFn() {
        return {
            transclude:    true,
            controller :   'routeTraverseCtrl',
            controllerAs : 'rtc',
            templateUrl :  'app/modules/core.module/templates/trav.tpl.html',
            link: function(scope, element, attr) {
                var vm = scope.rtc;
            }
        };
    }
})();
