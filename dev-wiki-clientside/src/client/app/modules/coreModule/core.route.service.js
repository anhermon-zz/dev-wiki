(function(angular) {
    'use strict';
    /*jshint validthis:true */
    angular.module('angCore')
    .service('angRouteService', angRouteService);
    ///////////////////////////////////////////////////
    function angRouteService($state, PubSub) {
        var self = this;
        self.route = 'home.index';
        self.subscriptions = [];
        self.subscriptions.push(PubSub.subscribe('event-route-change' , setRoute));
        self.subscriptions.push(PubSub.subscribe('event-user-logged-in' , setRoute));
        self.setRoute = setRoute;

        return self;
        ////////////////
        function setRoute(ev, data) {
            console.log(ev);
            console.log('Setting route to:' + data.route);
            self.route = data.route;
            $state.go(self.route, data);
        }
    }
})(angular);
