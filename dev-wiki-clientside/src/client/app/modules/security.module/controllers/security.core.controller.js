(function(angular) {
    /*jshint validthis:true */
    'use strict';
    var controllerId = 'angSecurityCtrl';
    angular.module('ang.security')
    .controller(controllerId, angSecurityCtrl);
    //////////////
    //@ngInject//
    function angSecurityCtrl($rootScope, PubSub, logger) {
        var getLogFn = logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.user = {};
        vm.setRout = setRout;
        //////////////////////
        function setRout(route) {
            PubSub.publish('event-route-change', {route: route});
        }
    }
})(angular);
