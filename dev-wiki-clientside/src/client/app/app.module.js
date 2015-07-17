(function(angular) {
    'use strict';
    angular.module('app', [
        'app.common',
        'ang.core',
        /**
        * Features areas
        */
        'ang.security',
        'ang.menu',
        'ang.content'
    ]);
})(angular);
