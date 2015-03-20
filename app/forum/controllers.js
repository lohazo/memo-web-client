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
      });
    };

    $scope.getListSubscription();
  }

	function PostDetailCtrl($scope, ForumServices, Post) {
    $scope.post = Post.data;
    $scope.data = {
      content: '',
      id: $scope.post._id
    };

    $scope.listComment = function() {
      ForumServices.listComment($scope.data).success(function(data){
        $scope.post.comment = data.comments.filter(function (item) {
        return item.comment === $scope.post.comment;
      })[0];
        console.log($scope.post.comment);
      });
    };

    $scope.listComment();

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

    $scope.post.vote = false;
    $scope.post.type = '';

    $scope.voteUpPost = function() {
      if ($scope.post.vote == false) {
        $scope.post.vote = true;
        $scope.post.type = 'upvote';
        ForumServices.votePost($scope.post).success(function() {
          $scope.post.up_vote = $scope.post.up_vote + 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
        $scope.post.vote = false;        
        $scope.post.type = 'upvote';
        ForumServices.votePost($scope.post).success(function() {
          $scope.post.up_vote = $scope.post.up_vote - 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
        $scope.post.vote = true;
        $scope.post.type = 'downvote';
      };
    };

    $scope.voteDownPost = function() {
      if ($scope.post.vote == false) {
        $scope.post.vote = true;
        $scope.post.type = 'downvote';
        ForumServices.votePost($scope.post).success(function() {
        $scope.post.down_vote = $scope.post.down_vote + 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
        $scope.post.vote = false;
        $scope.post.type = 'downvote';
        ForumServices.votePost($scope.post).success(function() {
          $scope.post.down_vote = $scope.post.down_vote - 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
        $scope.post.vote = true;
        $scope.post.type = 'upvote';
      };
    };


    $scope.listComments = function() {

    };

    // $scope.voteUpComment = function() {
    //   if ($scope.post.vote == false) {
    //     $scope.post.vote = true;
    //     $scope.post.type = 'upvote';
    //     ForumServices.voteComment($scope.post.comment).success(function() {
    //       $scope.post.up_vote = $scope.post.up_vote + 1;
    //     });
    //   } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
    //     $scope.post.vote = false;        
    //     $scope.post.type = 'upvote';
    //     ForumServices.voteComment($scope.post.comment).success(function() {
    //       $scope.post.up_vote = $scope.post.up_vote - 1;
    //     });
    //   } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
    //     $scope.post.vote = true;
    //     $scope.post.type = 'downvote';
    //   };
    // };

    // $scope.voteDownComment = function() {
    //   if ($scope.post.vote == false) {
    //     $scope.post.vote = true;
    //     $scope.post.type = 'downvote';
    //     ForumServices.voteComment($scope.post.comment).success(function() {
    //     $scope.post.down_vote = $scope.post.down_vote + 1;
    //     });
    //   } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
    //     $scope.post.vote = false;
    //     $scope.post.type = 'downvote';
    //     ForumServices.voteComment($scope.post.comment).success(function() {
    //       $scope.post.down_vote = $scope.post.down_vote - 1;
    //     });
    //   } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
    //     $scope.post.vote = true;
    //     $scope.post.type = 'upvote';
    //   };
    // };

    $scope.creatComment = function() {
      ForumServices.creatComment($scope.data);
    };
	}

	angular.module('forum.controllers', ['forum.services'])
	  .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', CreatePostCtrl])
	  .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Post', PostDetailCtrl]);
}(window.angular));