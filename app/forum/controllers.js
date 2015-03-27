(function (angular) {
  'use strict';

  function ListPostCtrl($scope, $location, ForumServices, allPosts, subscribers, followingPosts) {
    $scope.subscribers = subscribers.data;
    $scope.allPosts = allPosts.data;
    $scope.allPosts.posts = allPosts.data.posts.map(function (post) {
      post.created_time = Math.round((new Date('' + post.created_at)).getTime() / 1000);
      return post;
    });
    $scope.allPosts.current_page = $scope.allPosts.next_page > 0 ? $scope.allPosts.next_page - 1 : $scope.allPosts.total_page;

    $scope.followingPosts = followingPosts.data;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.setPage = function (page) {
      var search = {
        page: page
      };
      if ($location.search().keywords) {
        search.keywords = $location.search().keywords;
      }
      $location.search(search);
      return;
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          $location.search({
            keywords: $scope.postSearch.keywords
          });
        }
      }
    };
  }

  function CreatePostCtrl($scope, ForumServices, $location, subscribers) {
    $scope.data = {
      title: '',
      content: '',
      base_course_id: ''
    };

    $scope.subscribers = subscribers.data;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          $location.url('/forum').search({
            keywords: $scope.postSearch.keywords
          });
        }
      }
    };

    $scope.createPost = function () {
      if ($scope.data.title.length <= 0) {
        alert("Bạn chưa nhập Tiêu đề cho bài thảo luận");
        return;
      }
      if ($scope.data.content.length <= 0) {
        alert("Bạn chưa nhập Nội dung cho bài thảo luận");
        return;
      }

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

  function PostDetailCtrl($scope, ForumServices, $location, Post, subscribers) {
    $scope.post = Post.data;
    $scope.data = {
      content: '',
      id: $scope.post._id
    };

    $scope.subscribers = subscribers.data;
    $scope.postSearch = {
      keywords: ''
    };

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.postSearch.keywords.length > 0) {
          $location.url('/forum').search({
            keywords: $scope.postSearch.keywords
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
        post.up_vote_count = post.up_vote_count + 1;
        if (post.is_vote_down) {
          post.down_vote_count = post.down_vote_count - 1;
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
        post.down_vote_count = post.down_vote_count + 1;
        if (post.is_vote_up) {
          post.up_vote_count = post.up_vote_count - 1;
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
    $scope.isSending = false;
    $scope.createComment = function () {
      if (!$scope.isSending && $scope.data.content != '') {
        $scope.isSending = true;
        ForumServices.creatComment($scope.data).success(function (data) {
          $scope.post.comments.push(data);
          $scope.post.total_comment = $scope.post.total_comment + 1;
          $scope.data.content = '';
          $scope.isSending = false;
        });
      }
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
    .controller('ListPostCtrl', ['$scope', '$location', 'ForumServices', 'allPosts', 'subscribers', 'followingPosts',
      ListPostCtrl
    ])
    .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', 'subscribers', CreatePostCtrl])
    .controller('PostDetailCtrl', ['$scope', 'ForumServices', '$location', 'Post', 'subscribers', PostDetailCtrl]);
}(window.angular));