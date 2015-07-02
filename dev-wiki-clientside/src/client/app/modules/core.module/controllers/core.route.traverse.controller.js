(function() {
    /*jshint validthis:true */
    'use strict';
    var controllerId = 'routeTraverseCtrl';
    angular.module('ang.core')
    .controller(controllerId, controllerFn);
    ///////////////////////
    function controllerFn(angRouteService) {
        var vm = this;
        vm.next = angRouteService.next;
        vm.back = angRouteService.back;
    }
}());
