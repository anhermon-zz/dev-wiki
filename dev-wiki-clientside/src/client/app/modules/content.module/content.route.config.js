(function(angular) {
    'use strict';
    angular.module('ang.content')
    .config(stateProviderConfig);
    ////////
    /* @ngInject */
    function stateProviderConfig ($stateProvider) {
        $stateProvider
            .state('home.articles', {
                abstract: true,
                url: '/articles',
                views: {
                    'center@':  {template: '<data-ang-content-articles></data-ang-content-articles>'},
                    'article.body@': {template: 'test'}
                }
            })
            .state('home.articles.read', {
                url: '/read',
                views: {
                    'article.body': {template: 'read'}
                }
            })
            .state('home.articles.write', {
                url: '/write',
                views: {
                    'article.body': {template: '<ang-article-editor></ang-article-editor>'}
                }
            });
    }
})(angular);
