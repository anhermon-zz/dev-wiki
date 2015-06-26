(function (angular) {
    /*jshint validthis:true */
    'use strict';
    angular.module('angCore')
    .controller('angCoreController', angCoreController);
    ////////////////////////
    /*@ngInject*/
    function angCoreController($scope, angCoreService) {
        var vm = this;
        vm.service = angCoreService;        
        $scope.$on('menu-item-selected-event' , setRoute);//upon menu-item-selected-event set specified route
        
        function setRoute(ev, data) {
            console.log('Setting route to:' + data.route);
            vm.route = data.route;
        }
    }
    

})(angular);
