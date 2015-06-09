(function(angular) {
    'use strict';
    angular.module('app')
        .config(exceptionHandler);
    /////////////
    /* @ngInject */
    function exceptionHandler($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate' , function ($delegate) {
            return function (exception, cause){
                $delegate(exception, cause);
                //alert(exception.message);
            };
        }]);
    }
})(angular);
