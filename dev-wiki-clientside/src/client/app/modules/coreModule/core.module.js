(function(angular) {
    'use strict';
    /**
    * Core module - used to communicate between different modules
    * other modules should not have any dependencies on other module
    */
    angular.module('angCore', [
                        'angMenu',
                        'angSecurity',
                        'ui.router'
    ]);
})(angular);
