(function (angular) {
  'use strict';

  function CreatePostCtrl($scope, ForumServices, $location) {
    $scope.data = {
      title: '',
      content: '',
      base_course_id: ''
    };

    $scope.createPost = function () {
      ForumServices.createPost($scope.data).success(function (data) {
        $location.url('/forum/post/' + data._id);
      });

    };

    $scope.getListSubscription = function () {
      ForumServices.getListSubscription().success(function (data) {
        $scope.listSubscriptions = data.list_subscriptions;
      });
    };

    $scope.getListSubscription();
  }

  function ListPostCtrl($scope, ForumServices) {

    $scope.posts = [{
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd': "admin",
      'datetime': "12/12/15",
      "course": "memoeee"
    }, {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd': "admin",
      'datetime': "12/12/15",
      "course": "memoeee"
    }, {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "122",
      'userd': "admin",
      'datetime': "12/12/15",
      "course": "memoeee"
    }];
    $scope.tabPost = [{
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd': "admin",
      'datetime': "12/12/15",
      "course": "memoeee"
    }];
    $scope.tabPostFollow = [{
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "1112",
      'userd': "admin",
      'datetime': "12/12/15",
      "course": "memoeee"
    }];

    $scope.listPosts = function () {
      ForumServices.listPosts();
    }
    $scope.listPosts();

  }

  function PostDetailCtrl($scope, ForumServices, Post) {
    $scope.post = Post.data;
    $scope.data = {
      content: '',
      id: $scope.post._id
    };

    $scope.listComment = function () {
      ForumServices.listComment($scope.data).success(function (data) {
        $scope.post.comments = data.comments;
      });
    };

    $scope.listComment();

    $scope.followPost = function () {
      ForumServices.followPost($scope.post).success(function () {
        $scope.post.follow = true;
      });
    };

    $scope.unfollowPost = function () {
      ForumServices.unFollowPost($scope.post).success(function () {
        $scope.post.follow = false;
      });
    };

    $scope.post.vote = false;
    $scope.post.type = '';

    $scope.voteUpPost = function () {
      if ($scope.post.vote == false) {
        $scope.post.vote = true;
        $scope.post.type = 'upvote';
        ForumServices.votePost($scope.post).success(function () {
          $scope.post.up_vote = $scope.post.up_vote + 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
        $scope.post.vote = false;
        $scope.post.type = 'upvote';
        $scope.post.up_vote = $scope.post.up_vote - 1;
      } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
        $scope.post.vote = true;
        $scope.post.type = 'downvote';
        ForumServices.votePost($scope.post).success(function () {
          $scope.post.up_vote = $scope.post.up_vote - 1;
        })
      };
    };

    $scope.voteDownPost = function () {
      if ($scope.post.vote == false) {
        $scope.post.vote = true;
        $scope.post.type = 'downvote';
        ForumServices.votePost($scope.post).success(function () {
          $scope.post.down_vote = $scope.post.down_vote + 1;
        });
      } else if ($scope.post.vote == true && $scope.post.type == 'downvote') {
        $scope.post.vote = false;
        $scope.post.type = 'downvote';
        $scope.post.down_vote = $scope.post.down_vote - 1;
      } else if ($scope.post.vote == true && $scope.post.type == 'upvote') {
        $scope.post.vote = true;
        $scope.post.type = 'upvote';
        ForumServices.votePost($scope.post).success(function () {
          $scope.post.down_vote = $scope.post.down_vote - 1;
        })
      };
    };

    $scope.creatComment = function () {
      ForumServices.creatComment($scope.data);
    };

    /*
     * Vote up cho 1 comment
     * @comment: comment duoc vote
     */
    $scope.voteUpComment = function (comment) {
      if (comment.is_vote_up) {
        comment.up_vote_count = comment.up_vote_count - 1;
      } else {
        comment.up_vote_count = comment.up_vote_count + 1;
        if (comment.is_vote_down) {
          comment.down_vote_count = comment.down_vote_count - 1;
          comment.is_vote_down = false;
        }
      }
      comment.is_vote_up = !comment.is_vote_up;
      ForumServices.voteComment({
        id: comment._id,
        type: 'upvote',
        vote: comment.is_vote_up
      });
    };

    $scope.voteDownComment = function (comment) {
      if (comment.is_vote_down) {
        comment.down_vote_count = comment.down_vote_count - 1;
      } else {
        comment.down_vote_count = comment.down_vote_count + 1;
        if (comment.is_vote_up) {
          comment.up_vote_count = comment.up_vote_count - 1;
          comment.is_vote_up = false;
        }
      }
      comment.is_vote_down = !comment.is_vote_down;
      ForumServices.voteComment({
        id: comment._id,
        type: 'downvote',
        vote: comment.is_vote_down
      });
    };
  }

  angular.module('forum.controllers', ['forum.services'])
    .controller('ListPostCtrl', ['$scope', 'ForumServices', ListPostCtrl])
    .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', CreatePostCtrl])
    .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Post', PostDetailCtrl]);
}(window.angular));