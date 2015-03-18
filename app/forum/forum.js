(function(angular) {

	'use strict';

	function ForumConfig($routeProvider) {
		$routeProvider.when('/forum/posts', {
			templateUrl: 'forum/_create-post.html',
			controller: 'CreatePostCtrl'
		});
		$routeProvider.when('/forum/posts/id', {
			templateUrl: 'forum/_post-detail.html',
			controller: 'PostDetailCtrl'
		});
	}

  function CreatePostCtrl($scope) {
  	$scope.owned_courses = [{course_name: 'Memo Tiếng Việt'},{ course_name: 'Tiếng Anh'},{ course_name: 'Tiếng Đức' },{ course_name: 'Tiếng Pháp'}];
  }

	function PostDetailCtrl($scope) {
		// Xử lí logic cho 2 nút "Theo dõi" và "Bỏ theo dõi"
		$scope.isFollowing = false;
		$scope.follow = function() {
			$scope.isFollowing = true;
		}
		$scope.unFollow = function() {
			$scope.isFollowing = false;
		}

		// Xử lí logic cho 2 nut "vote-up" và "vote-down"
		$scope.totalVote = 0;
		$scope.vote = false;
		$scope.voteUp = function() {
      if ($scope.vote == false) {
				$scope.vote = true;
	      $scope.voteup = true;
	      $scope.voteup = false;
	      $scope.TotalVote = $scope.TotalVote + 1;
      } else if ($scope.vote == true) {
      	$scope.vote = false;
      	$scope.voteup = false;
	      $scope.voteup = true;
	      $scope.TotalVote = $scope.TotalVote - 1;
      };
		}
		$scope.voteDown = function() {
			if ($scope.vote == false) {
				$scope.vote = true;
	      $scope.voteup = false;
	      $scope.voteup = true;
	      $scope.TotalVote = $scope.TotalVote - 1;
      } else if ($scope.vote == true) {
      	$scope.vote = false;
      	$scope.voteup = true;
	      $scope.voteup = false;
	      $scope.TotalVote = $scope.TotalVote + 1;
      };
		}

		// Xử lí logic cho nút "Trả lời" và nút "Hủy"
    $scope.isReplying = false;
    $scope.reply = function() {
    	$scope.isReplying = true;
    }
    $scope.cancelReply = function() {
    	$scope.isReplying = false;
    }
	}

	angular.module('forum', [])
	  .config(['$routeProvider', ForumConfig])
	  .controller('CreatePostCtrl', ['$scope', CreatePostCtrl])
	  .controller('PostDetailCtrl', ['$scope', PostDetailCtrl]);
}(window.angular));