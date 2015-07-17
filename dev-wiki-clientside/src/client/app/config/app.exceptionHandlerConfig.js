(function(angular) {
    'use strict';
    angular.module('app')
    .config(function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', 'config', 'logger', extentExceptionHandler]);
    });

    function extentExceptionHandler($delegate, config, logger) {
        var appErrorPrefix = config.appErrorPrefix;
        var logError = logger.getLogFn('app', 'error');
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) {
                var errorData = {exception: exception, cause: cause};
                var msg = appErrorPrefix + exception.message;
                logError(msg, errorData, true);
            }
        };
    }
})(angular);
