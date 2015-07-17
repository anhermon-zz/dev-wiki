(function() {
    'use strict';
    var directiveId = 'angArticleEditor';
    angular.module('ang.content')
    .directive(directiveId, directiveFn);
    ///////////////////
    function directiveFn() {
        return {
            transclude:    true,
            controller :   'ArticleEditorCtrl',
            controllerAs : 'aec',
            templateUrl :  'app/modules/content.module/templates/article.editor.tpl.html',
            scope: {},
            link: function(scope, element, attr) {
                var vm = scope.controllerAs;
            }
        };
    }
})();
