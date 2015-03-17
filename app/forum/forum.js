(function(angular) {

	'use strict';

	function ForumConfig($routeProvider) {
		$routeProvider.when('/forum/post', {
			templateUrl: 'forum/_create-post.html',
			controller: ''
		});
		$routeProvider.when('/forum/postDetail', {
			templateUrl: 'forum/_post-detail.html',
			controller: ''
		});
	}

	angular.module('forum', [])
	  .config(['$routeProvider', ForumConfig]);
}(window.angular));