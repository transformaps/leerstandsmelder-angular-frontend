'use strict';

var RecentPostsDirective = function (apiService, assetPath) {
    return {
        restrict: 'A',
        scope: {
            pageSize: '='
        },
        templateUrl: assetPath + 'partials/_recent_posts.html',
        link: function (scope, elem, attrs) {
            scope.$watch(attrs.pageSize, function () {
                apiService('posts?sort=-created&limit=' + (parseInt(scope.pageSize) || 10))
                    .actions.all(function (err, posts) {
                    scope.$applyAsync(function () {
                        if (!err && posts) {
                            scope.posts = posts;
                        } else {
                            scope.posts = [];
                        }
                    });
                });
            });
        }
    };
};

RecentPostsDirective.$inject = ['apiService', 'assetPath'];

module.exports = RecentPostsDirective;