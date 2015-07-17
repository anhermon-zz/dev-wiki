(function(angular) {
    'use strict';
    angular.module('ang.menu')
        .directive('angMenuItem', angMenuItemDirective);
    ////////////
    function angMenuItemDirective($timeout) {
        return {
            require:    '^angMenu',
            replace:    true,
            transclude: true,
            templateUrl: 'app/modules/menu.module/templates/menuItem.tpl.html',
            scope: {
                label: '@',
                icon:  '@',
                route: '@',
                class: '@'
            },
            link: function(scope, el, attrs, ctrl) {
                var vm = ctrl; //ctrl reffers to angMenu (parent controller)
                //Make sure menu items are hidden if menu is closed
                scope.$watch(
                    function () {
                        return vm.menuState;
                    }, function () {
                        vm.menuState ? $timeout(function() {
                            el.removeClass('hidden')
                        }, 500) : el.addClass('hidden');
                    });
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
