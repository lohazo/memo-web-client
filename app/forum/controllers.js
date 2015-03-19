(function (angular) {
	'use strict';

	function CreatePostCtrl($scope, ForumServices) {
  	$scope.owned_courses = [
  		{course_name: 'Memo Tiếng Việt'},
  		{ course_name: 'Tiếng Anh'},
  		{ course_name: 'Tiếng Đức' },
  		{ course_name: 'Tiếng Pháp'}
  	];

    $scope.data = {
      titletext: '',
      contenttext: ''
    };

  	$scope.createPost = function() {
  		ForumServices.post($scope.data);
  	}
  }

	function PostDetailCtrl($scope, ForumServices, Forum) {
    
	}

	angular.module('forum.controllers', ['forum.services'])
	  .controller('CreatePostCtrl', ['$scope', 'ForumServices', CreatePostCtrl])
	  .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Forum', PostDetailCtrl]);
}(window.angular));