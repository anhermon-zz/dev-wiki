(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .directive('angSecurityRole', angSecurityRole);
    ////////////
    function angSecurityRole($timeout, PubSub) {
        var NG_HIDE_CLASS = 'ng-hide';
        var NG_ENTER_CLASS = 'ng-enter';
        var NG_LEAVE_CLASS = 'ng-leave';
        var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';
        return {
            restrict: 'A',
            transclude: false,
            multiElement: true,
            controller: 'angLoginCtrl',
            controllerAs: 'alc',
            link: function(scope, element, attr) {
                var vm = scope.alc;
                scope.$watch(function() {return attr.angSecurityRole;}, ngShowWatchAction);
                var subscriptions = [];
                //listen to role changing events
                subscriptions.push(PubSub.subscribe('event-user-logged-out' , ngShowWatchAction));
                subscriptions.push(PubSub.subscribe('event-user-logged-in'  , ngShowWatchAction));
                //remove subscriptions when destroyed
                scope.$on('$destroy', function() {
                    angular.forEach(subscriptions, function(subscription) {
                        PubSub.unsubscribe(subscription);
                    });
                });
                //////////////
                function ngShowWatchAction(newVal, oldVal) {
                    var changed      = newVal !== oldVal;
                    var actualRole   = vm.getRole();
                    var requiredRole = attr.angSecurityRole;
                    var show         = requiredRole === actualRole;
                    var animation    = 'animated fade' + (show ? 'In' : 'Out');
                    if (show) {
                        element.css('display', 'block');
                    }
                    element.addClass(animation);
                        $timeout(function() {
                            element.removeClass(animation);
                            if (!show) {
                                element.css('display', 'none');
                            }
                        }, 1000);
                }
            }
        };
    }
})(angular);
