(function(angular) {
    'use strict';
    /**
    * Listents and publishes security related events
    */
    angular.module('angSecurity')
    .service('securityEventService', securityEventService);
    /////////////////
    function securityEventService(PubSub) {
        /*jshint validthis:true */
        var self = this;

        self.loggedIn    = loggedIn;
        self.loggedOut   = loggedOut;
        self.changeRoute = changeRoute;

        return self;
        ///////////////////////////////
        function loggedIn(data) {
            data.route = 'home.index';
            PubSub.publish('event-user-logged-in', data);
        }
        function loggedOut() {
            PubSub.publish('event-user-logged-out', {route : 'home.index'});
        }
        function changeRoute(route) {
            PubSub.publish('event-route-change', {route : route});
        }
    }
})(angular);
