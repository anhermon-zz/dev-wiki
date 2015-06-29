(function(angular) {
    'use strict';
    /**
    * Core module - used to communicate between different modules
    * other modules should be as independent as possible
    */
    angular.module('angCore', [
                        'angMenu',
                        'angSecurity',
                        'angContent',
                        'ui.router',
                        'PubSub',
                        'ngAnimate'
    ]);
})(angular);
