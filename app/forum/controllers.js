(function (angular) {
	'use strict';

	function CreatePostCtrl($scope, ForumServices, $location) {
    $scope.data = {
      title: '',
      content: '',
      base_course_id: ''
    };

  	$scope.createPost = function() {
  		ForumServices.createPost($scope.data).success(function(data) {
        $location.url('/forum/post/' + data._id);
      });
  	};

    $scope.getListSubscription = function() {
      ForumServices.getListSubscription().success(function(data) {
        $scope.listSubscriptions = data.list_subscriptions;
      })
    };

    $scope.getListSubscription();
  }

	function PostDetailCtrl($scope, ForumServices, Post) {
    $scope.post = Post.data;

    $scope.followPost = function() {
      ForumServices.followPost($scope.post).success(function() {
        $scope.post.follow = true;
      });
    };

    $scope.unfollowPost = function() {
      ForumServices.unFollowPost($scope.post).success(function() {
        $scope.post.follow = false;
      });
    };
	}

	angular.module('forum.controllers', ['forum.services'])
	  .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', CreatePostCtrl])
	  .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Post', PostDetailCtrl]);
}(window.angular));