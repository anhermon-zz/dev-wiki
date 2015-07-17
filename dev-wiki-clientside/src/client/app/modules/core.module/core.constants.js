(function () {
    /*jshint validthis:true */
    'use strict';
    var appConstants = initAppConstants();
    angular.module('ang.core')
    .constants('ENV', appConstants);
    ////////////////////////
    function initAppConstants() {
        return {
            url : 'http://localhost:8080/'
        };
    }

})();
