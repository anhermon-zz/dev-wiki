(function(angular) {
    'use strict';
    /**
    * Core module - used to communicate between different modules
    * other modules should be as independent as possible
    */
    angular.module('ang.core', [
                        /*
                        * Angular modules
                        */
                        'ngAnimate',
                        /*
                        * 3rd party modules
                        */
                        'ui.router',
                        'PubSub'
    ]);
})(angular);
