(function (angular) {
    /*jshint validthis:true */
    'use strict';
    angular.module('ang.menu')
    .controller('menuController', menuController);
    ////////////////////////
    /*@ngInject*/
    function menuController($scope, $rootScope, PubSub) {
        var vm           = this;
        vm.menuState     = true;
        vm.toggle        = toggle;
        vm.setActiveItem = setActiveItem;
        vm.setRoute      = setRoute;
        /////
        function toggle() {
            vm.menuState = !vm.menuState;
        }
        function setActiveItem(item) {
            vm.activeItem = item;
        }
        function getActiveItem() {
            console.log('Active item:' , vm.activeItem);
            return vm.activeItem;
        }
        function setRoute(route) {
            //broadcasts an event when item is selected
            PubSub.publish('event-route-change', {route: route});
        }
    }
})(angular);
