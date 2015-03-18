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

	function PostDetailCtrl($scope) {
    $scope.post = {
    	"_id": "Tiếng Pháp",
      "title": "học như thế nào trong 1 ngày để qua 1 kỹ năng mới ?",
      "content": "mình học xong 2 kỹ năng cơ bản đến phần cụm từ thì dù hoàn thành nhưng vẫn không thể sang kỹ năng mới. cho mình hỏi có nguyên tắc nào ở đây không ? và muốn sang kỹ năng tiếp theo thì luyện tập nâng cao kỹ năng như thế nào mới đúng ?",
      "user": "ljnkshady",
      "url_avatar": "https://lh5.googleusercontent.com/-PhO-cPHpyN4/AAAAAAAAAAI/AAAAAAAAAB0/RPkVIvb84l4/photo.jpg",
      "up_vote": 80,
      "down_vote": 2,
      "follow": 3,
      "follow_message": 3,
      "created_at": "29/7/2014",
      "total_comment": 5
    }

		// Xử lí logic cho 2 nút "Theo dõi" và "Bỏ theo dõi"
		$scope.isFollowing = false;
		$scope.follow = function() {
			$scope.isFollowing = true;
		}
		$scope.unFollow = function() {
			$scope.isFollowing = false;
		}

		// Xử lí logic cho 2 nut "vote-up" và "vote-down"
		$scope.vote = false;
		$scope.voteUp = function() {
      if ($scope.vote == false) {
				$scope.vote = true;
	      $scope.voteup = true;
	      $scope.votedown = false;
	      $scope.post.up_vote = $scope.post.up_vote + 1;
      } else if ($scope.vote == true) {
      	$scope.vote = false;
      	$scope.voteup = false;
	      $scope.votedown = false;
	      $scope.post.up_vote = $scope.post.up_vote - 1;
      };
		}
		$scope.voteDown = function() {
			if ($scope.vote == false) {
				$scope.vote = true;
	      $scope.voteup = false;
	      $scope.votedown = true;
	      $scope.post.down_vote = $scope.post.down_vote - 1;
      } else if ($scope.vote == true) {
      	$scope.vote = false;
      	$scope.voteup = false;
	      $scope.votedown = true;
	      $scope.post.down_vote = $scope.post.down_vote + 1;
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

	angular.module('forum.controllers', ['forum.services'])
	  .controller('CreatePostCtrl', ['$scope', 'ForumServices', CreatePostCtrl])
	  .controller('PostDetailCtrl', ['$scope', PostDetailCtrl]);
}(window.angular));