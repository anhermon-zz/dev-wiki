(function(angular) {
    'use strict';
    var config = {
        appErrorPrefix: '[DEV WIKI Error]',
        docTitle:       'Dev Wiki',
        version:        '1.0.0',
        debug:          true
    };
    ////////////////
    angular.module('app')
    .value('config', config);
})(angular);
