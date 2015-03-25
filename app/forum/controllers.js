(function (angular) {
  'use strict';

  function ListPostCtrl($scope, $location, ForumServices, allPosts, subscribers, followingPosts) {
    $scope.subscribers = subscribers.data;
    $scope.stickyPosts = allPosts.data.sticky_posts;
    $scope.allPosts = allPosts.data.posts;
    $scope.followingPosts = followingPosts.data.posts;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          // $location.search({
          //   search: $scope.postSearch.keywords
          // });
          ForumServices.searchPosts({
            keywords: $scope.postSearch.keywords
          }).success(function (data) {
            $scope.stickyPosts = data.sticky_posts;
            $scope.allPosts = data.posts;
          });
        }
      }
    };
  }

  function CreatePostCtrl($scope, ForumServices, $location, allPosts, subscribers) {
    $scope.redata = {
      title: '',
      content: '',
      base_course_id: ''
    };

    $scope.subscribers = subscribers.data;
    $scope.stickyPosts = allPosts.data.sticky_posts;
    $scope.allPosts = allPosts.data.posts;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          // $location.search({
          //   search: $scope.postSearch.keywords
          // });
          ForumServices.searchPosts({
            keywords: $scope.postSearch.keywords
          }).success(function (data) {
            $scope.stickyPosts = data.sticky_posts;
            $scope.allPosts = data.posts;
          });
        }
      }
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

  function PostDetailCtrl($scope, ForumServices, Post, allPosts, subscribers) {
    $scope.post = Post.data;
    $scope.data = {
      content: '',
      id: $scope.post._id
    };

    $scope.subscribers = subscribers.data;
    $scope.stickyPosts = allPosts.data.sticky_posts;
    $scope.allPosts = allPosts.data.posts;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          // $location.search({
          //   search: $scope.postSearch.keywords
          // });
          ForumServices.searchPosts({
            keywords: $scope.postSearch.keywords
          }).success(function (data) {
            $scope.stickyPosts = data.sticky_posts;
            $scope.allPosts = data.posts;
          });
        }
      }
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

    $scope.voteUpPost = function (post) {
      if (post.is_vote_up) {
        post.up_vote_count = post.up_vote_count - 1;
      } else {
        post.up_vote_count = post.up_vote_count +1;
        if (post.is_vote_down) {
          post.down_vote_count = post.down_vote_count -1;
          post.is_vote_down = false;        
        }
      }
      post.is_vote_up = !post.is_vote_up;
      ForumServices.votePost({
        id: post._id,
        type: 'upvote',
        vote: post.is_vote_up
      });
    };

    $scope.voteDownPost = function (post) {
      if (post.is_vote_down) {
        post.down_vote_count = post.down_vote_count - 1;
      } else {
        post.down_vote_count = post.down_vote_count +1;
        if (post.is_vote_up) {
          post.up_vote_count = post.up_vote_count -1;
          post.is_vote_up = false;
        }
      }
      post.is_vote_down = !post.is_vote_down;
      ForumServices.votePost({
        id: post._id,
        type: 'downvote',
        vote: post.is_vote_down
      });
    };

    $scope.createComment = function () {
      ForumServices.creatComment($scope.data).success(function (data) {
        $scope.post.comments.push(data);
      });
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
    .controller('ListPostCtrl', ['$scope', '$location', 'ForumServices', 'allPosts', 'subscribers', 'followingPosts', ListPostCtrl])
    .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', 'allPosts', 'subscribers', CreatePostCtrl])
    .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Post', 'allPosts', 'subscribers', PostDetailCtrl]);
}(window.angular));