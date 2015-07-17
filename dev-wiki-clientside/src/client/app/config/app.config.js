(function(angular) {
    'use strict';
    angular.module('app')
    .config(logConfig);
    ///////////////

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    function logConfig($logProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }
})(angular);
