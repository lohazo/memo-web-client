(function (angular) {

  'use strict';

  function ForumConfig($routeProvider) {
    $routeProvider.when('/forum/post/create', {
      templateUrl: 'forum/_create-post.html',
      controller: 'CreatePostCtrl',
      resolve: {
        allPosts: function ($route, ForumServices) {
          if ($route.current.params.keywords) {
            return ForumServices.searchPosts($route.current.params);
          }
          return ForumServices.listPosts($route.current.params);
        },
        subscribers: function (ForumServices) {
          return ForumServices.getListSubscription();
        }
      }
    });

    $routeProvider.when('/forum/post/:id', {
      templateUrl: 'forum/_post-detail.html',
      controller: 'PostDetailCtrl',
      resolve: {
        Post: function ($route, ForumServices) {
          return ForumServices.getPost({
            id: $route.current.params.id
          });
        },
        allPosts: function ($route, ForumServices) {
          if ($route.current.params.search) {
            var text = $route.current.params.search;
            return ForumServices.searchPosts({
              keywords: text
            });
          }
          return ForumServices.listPosts($route.current.params);
        },
        subscribers: function (ForumServices) {
          return ForumServices.getListSubscription();
        }
      }
    });

    $routeProvider.when('/forum', {
      templateUrl: 'forum/_thread-list.html',
      controller: 'ListPostCtrl',
      resolve: {
        allPosts: function ($route, ForumServices) {
          if ($route.current.params.search) {
            var text = $route.current.params.search;
            return ForumServices.searchPosts({
              keywords: text
            });
          }
          return ForumServices.listPosts($route.current.params);
        },
        subscribers: function (ForumServices) {
          return ForumServices.getListSubscription();
        },
        followingPosts: function (ForumServices) {
          return ForumServices.listPosts({
            filter: 'follow'
          });
        }
      }
    });
  }

  angular.module('forum', ['forum.services', 'forum.controllers', 'forum.directives'])
    .config(['$routeProvider', ForumConfig])
}(window.angular));