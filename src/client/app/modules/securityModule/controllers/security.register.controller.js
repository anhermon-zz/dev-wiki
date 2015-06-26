(function(angular) {
    /*jshint validthis:true */
    'use strict';
    angular.module('angSecurity')
    .controller('angRegisterCtrl', angRegisterCtrl);
    //////////////
    //@ngInject//
    function angRegisterCtrl(userService) {
        var vm = this;
        vm.service = userService;
        vm.registeration = {};
        vm.register = register;
        //////////////////////
        function register() {
            vm.service.register(vm.registeration);
        }
    }
})(angular);
