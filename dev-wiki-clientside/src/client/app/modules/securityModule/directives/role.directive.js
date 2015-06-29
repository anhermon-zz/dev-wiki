(function(angular) {
    'use strict';
    angular.module('angSecurity')
    .directive('angSecurityRole', angSecurityRole);
    ////////////
    function angSecurityRole($timeout, PubSub) {
        var DEFAULT_ANIMATION = 'fade';
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

                    var animation    = getAnimation();
                    console.log(element.attr('class'));
                    if (show) {
                        element.css('display', 'block');
                    }
                    console.log(animation);
                    element.addClass(animation);
                    $timeout(function() {
                        element.removeClass(animation);
                        if (!show) {
                            element.css('display', 'none');
                        }
                    }, 1000);
                    ////////////////
                    function getAnimation() {
                        var defaultAnimation = DEFAULT_ANIMATION + (show ? 'In' : 'Out');
                        var animation = null;
                        if (!!attr.animation && attr.animation !== null) {
                            animation = scope.$eval(attr.animation);
                            animation = show ? animation.enter : animation.leave;
                        }
                        return 'animated ' + (animation ?  animation : DEFAULT_ANIMATION);
                    }
                }
            }
        };
    }
})(angular);
