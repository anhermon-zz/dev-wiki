(function(angular) {
    /*jshint validthis:true */
    'use strict';
    var controllerId = 'angLoginCtrl';
    angular.module('ang.security')
    .controller(controllerId, angLoginCtrl);
    //////////////
    //@ngInject//
    function angLoginCtrl($http, $scope, $window, PubSub, logger, authService, userService, securityEventService) {
        var getLogFn = logger.getLogFn;
        var logInfo = getLogFn(controllerId);
        var logSuccess = getLogFn(controllerId, 'success');
        var logError = getLogFn(controllerId, 'error');

        var vm = this;
        vm.login    = login;
        vm.isAuthed = authService.isAuthed;
        vm.logout   = authService.logout;
        vm.username = authService.getUsername();
        vm.role     = authService.getRole();
        vm.getRole  = authService.getRole;
        vm.hasRole  = authService.hasRole;

        vm.changeRoute = securityEventService.changeRoute;
        vm.error = null;
        vm.subscriptions = [];

        vm.subscriptions.push(PubSub.subscribe('event-user-logged-in' , setClaims));
        vm.subscriptions.push(PubSub.subscribe('event-user-logged-out' , removeClaims));
        //when destroying the controller, remove all its subscriptions
        $scope.$on('$destroy', function() {
            angular.forEach(vm.subscriptions , function(subscription) {
                PubSub.unsubscribe(subscription);
            });
        });
        //////////////////////
        function login() {
            vm.error = null;
            return userService.login(vm.user)
                        .then(function(response) {
                            logSuccess('Signed in');
                            authService.saveToken(response.data);
                            securityEventService.loggedIn({route:   'home.index',
                                                           username: authService.getUsername(),
                                                           role:     authService.getRole()});
                        },
                        function(error) {
                            logError('Failed to sign in');
                        });
        }
        function  setClaims(ev, data) {
            console.log(ev, data);
            vm.username = data.username;
            vm.role     = data.role;
        }
        function  removeClaims(ev, data) {
            console.log(ev, data);
            vm.username = null;
            vm.role     = null;
        }
        function hasRole(role) {
            var out = vm.getRole() === role;
            console.log('Has role:', role, '? : ', out);
            return out;
        }
    }
})(angular);
