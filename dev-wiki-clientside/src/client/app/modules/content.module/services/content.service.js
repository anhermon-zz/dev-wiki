(function(angular) {
    'use strict';
    angular.module('ang.content')
    .factory('angContentService', angContentService);
    ///////////////////
    function angContentService(ENV) {
        return {

        };
        /////////////
        function getArticles() {
            var url = ENV.url + 'api/articles';
            return $http.get(url);
        }
    }
})(angular);
