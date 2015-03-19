(function(angular) {

	'use strict';

	function ForumConfig($routeProvider) {
		$routeProvider.when('/forum/post/create', {
			templateUrl: 'forum/_create-post.html',
			controller: 'CreatePostCtrl',
		});
		$routeProvider.when('/forum/post/:id', {
			templateUrl: 'forum/_post-detail.html',
			controller: 'PostDetailCtrl',
			resolve: {
				reqData: function($routeParams, Forumservices) {
					return ForumServices.getListPost({id: $routeParams.id});
				},
			}
		});
	}

	angular.module('forum', ['forum.services', 'forum.controllers'])
	  .config(['$routeProvider', ForumConfig]);
}(window.angular));