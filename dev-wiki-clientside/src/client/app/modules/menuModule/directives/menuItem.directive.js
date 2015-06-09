(function(angular) {
    'use strict';
    angular.module('angMenu')
        .directive('angMenuItem', angMenuItemDirective);
    ////////////
    function angMenuItemDirective(){
        return {
            require: '^angMenu',
            templateUrl: 'app/modules/menuModule/templates/menuItem.tpl.html',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            link: function(scope, el, attrs, ctrl) {
                var vm = ctrl; //ctrl reffers to angMenu
                scope.isActive = function () {
                    return el === vm.activeItem;
                };
                el.bind('click', function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
//                    el.css('display', 'none');
                    ctrl.setActiveItem(el);
                    ctrl.setRoute(scope.route);
//                    el.addClass('active');
//                    console.log(el);    
                    scope.$apply();
                });
            }
        };
    }
})(angular);
