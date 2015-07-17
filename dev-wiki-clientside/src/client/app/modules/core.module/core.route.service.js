(function(angular) {
    'use strict';
    /**
    *  Manages routes
    **/
    /*jshint validthis:true */
    var serviceId = 'angRouteService';
    angular.module('ang.core')
    .service(serviceId, angRouteService);
    ///////////////////////////////////////////////////
    function angRouteService($state, PubSub, logger) {
        var getLogFn = logger.getLogFn;
        var logInfo = getLogFn(serviceId);
        var logSuccess = getLogFn(serviceId, 'success');
        var logError = getLogFn(serviceId, 'error');

        var history = [];
        var historyMax = 20;
        var currentRouteIndex = 0;

        var self = this;
        self.route = 'home.index';
        self.subscriptions = [];
        self.subscriptions.push(PubSub.subscribe('event-route-change' , setRoute));
        self.subscriptions.push(PubSub.subscribe('event-user-logged-in' , setRoute));
        self.setRoute = setRoute;
        self.next = next;
        self.back = back;

        return self;
        ////////////////
        function setRoute(ev, data) {
            if (!data.route) {return;}
            logInfo('Setting route to: ' + data.route);
            self.route = data.route;
            $state.go(self.route, data);
            addRouteToHistory(data.route);
        }
        function addRouteToHistory(route) {
            history.push(route);
            if (history.length > historyMax) {
                history.splice(0, 1);
            }
            currentRouteIndex = history.length - 1;
        }
        function next() {
            if (currentRouteIndex < history.length) {
                currentRouteIndex++;
                $state.go(history[currentRouteIndex]);
            }
            logInfo('route: ' + history[currentRouteIndex] + ' Index: ' + currentRouteIndex);
        }
        function back() {
            if (currentRouteIndex > 0) {
                currentRouteIndex--;
                logInfo('back, route: ' + history[currentRouteIndex]);
                $state.go(history[currentRouteIndex]);
            }
            logInfo('route: ' + history[currentRouteIndex] + ' Index: ' + currentRouteIndex);
        }
    }
})(angular);
