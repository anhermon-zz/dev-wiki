(function(angular) {
    'use strict';
    /*jshint validthis:true */
    angular.module('angCore')
    .factory('angCoreService', angCoreService);
    ///////////////////////////////////////////////////
    function angCoreService() {
        return {
            test : test
        };
        function test() {
            console.log('test');
        }
    }
})(angular);
