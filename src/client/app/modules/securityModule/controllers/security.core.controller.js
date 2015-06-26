(function(angular) {
    /*jshint validthis:true */
    'use strict';
    angular.module('angSecurity')
    .controller('angSecurityCtrl', angSecurityCtrl);
    //////////////
    //@ngInject//
    function angSecurityCtrl($rootScope, PubSub) {
        var vm = this;
        vm.user = {};
        vm.setRout = setRout;
        //////////////////////
        function setRout(route) {
            PubSub.publish('event-route-change', {route: route});
        }
    }
})(angular);
