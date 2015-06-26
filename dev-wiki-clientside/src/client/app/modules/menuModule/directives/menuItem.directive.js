(function(angular) {
    'use strict';
    angular.module('angMenu')
        .directive('angMenuItem', angMenuItemDirective);
    ////////////
    function angMenuItemDirective() {
        return {
            require:    '^angMenu',
            replace:    true,
            transclude: true,
            templateUrl: 'app/modules/menuModule/templates/menuItem.tpl.html',
            scope: {
                label: '@',
                icon:  '@',
                route: '@',
                class: '@'
            },
            link: function(scope, el, attrs, ctrl) {
                var vm = ctrl; //ctrl reffers to angMenu (parent controller)
                scope.isActive = function () {
                    return el === vm.activeItem;
                };
                el.bind('click', function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    ctrl.setActiveItem(el);
                    ctrl.setRoute(scope.route);
                    scope.$apply();
                });
            }
        };
    }
})(angular);
