(function() {
    /*jshint validthis:true */
    'use strict';
    var controllerId = 'ArticleEditorCtrl';
    angular.module('ang.content')
    .controller(controllerId, controllerFn);
    ///////////////////////
    function controllerFn(authService, logger) {
        var vm = this;
        var getLogFn = logger.getLogFn;
        var logInfo = getLogFn(controllerId);
        var logSuccess = getLogFn(controllerId, 'success');
        var logError = getLogFn(controllerId, 'error');
        vm.article = {};

        vm.article.user = authService.getUsername();
        vm.activate = activate;
        vm.submit = submit;

        vm.activate();
        ////////////////////
        function activate() {
            logInfo(controllerId + " active");
        }
        function submit() {
            console.log(vm.article);
        }
    }
}());
