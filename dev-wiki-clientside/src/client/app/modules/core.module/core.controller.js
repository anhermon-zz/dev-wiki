(function (angular) {
    /*jshint validthis:true */
    'use strict';
    angular.module('ang.core')
    .controller('angCoreController', angCoreController);
    ////////////////////////
    /*@ngInject*/
    function angCoreController($scope, $state, angRouteService) {
        var vm = this;
        vm.service = angRouteService;
        vm.setRoute = vm.service.setRoute;
    }
})(angular);
