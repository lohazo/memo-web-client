/* global window */
/* global FB */
(function (angular) {
  'use strict';

  function ListPostCtrl($scope, $location, AuthService, ForumServices, allPosts, subscribers, followingPosts,
    searchPosts) {

    $scope.isAuthenticated = AuthService.isAuthenticated;

    function convertToViewData(data) {
      var output = angular.copy(data);
      if (!output.message) {
        output.posts = output.posts.map(function (post) {
          post.created_time = Math.round((new Date('' + post.created_at)).getTime() / 1000);
          return post;
        });
        output.current_page = output.next_page > 0 ? output.next_page - 1 : output.total_page;
        if (output.sticky_posts) {
          output.sticky_posts = output.sticky_posts.map(function (post) {
            post.created_time = Math.round((new Date('' + post.created_at)).getTime() / 1000);
            return post;
          });
        }
      }
      return output;
    }

    $scope.subscribers = subscribers.data;
    $scope.allPosts = convertToViewData(allPosts.data);
    $scope.followingPosts = convertToViewData(followingPosts.data);

    $scope.tabs = [{
      title: 'Tất cả',
      data: $scope.allPosts,
      active: true
    }];

    if ($scope.isAuthenticated()) {
      $scope.tabs.push({
        title: 'Đang theo dõi',
        data: $scope.followingPosts,
        active: false
      });
    }

    if ($location.search().keywords) {
      $scope.searchPosts = convertToViewData(searchPosts.data);
      $scope.tabs[0].active = false;
      $scope.tabs.push({
        title: 'Kết quả tìm kiếm',
        data: $scope.searchPosts,
        active: true
      });
    }

    $scope.postSearch = {
      keywords: ''
    };

    $scope.voteUpPost = function (post) {
      if ($scope.isAuthenticated()) {
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
      }
    };

    $scope.followStickyPost = function (post) {
      ForumServices.followPost(post).success(function (data) {
        post.is_followed = true;
        if (!$scope.tabs[1].data.posts) {
          $scope.tabs[1].data.posts = [];
        }
        $scope.tabs[1].data.posts.push(post);
      });

    };

    $scope.unfollowStickyPost = function (post) {
      ForumServices.unFollowPost(post).success(function (data) {
        post.is_followed = false;
        var index = $scope.tabs[1].data.posts.indexOf(post);
        $scope.tabs[1].data.posts.splice(index, 1);
      });
    };

    $scope.followPost = function (post) {
      ForumServices.followPost(post).success(function (data) {
        post.is_followed = true;
        if (!$scope.tabs[1].data.posts) {
          $scope.tabs[1].data.posts = [];
        }
        $scope.tabs[1].data.posts.push(post);
      });
    };

    $scope.unfollowPost = function (post) {
      ForumServices.unFollowPost(post).success(function (data) {
        post.is_followed = false;
        var index = $scope.tabs[1].data.posts.indexOf(post);
        $scope.tabs[1].data.posts.splice(index, 1);
      });
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

    $scope.searchWithButton = function () {
      if ($scope.postSearch.keywords.length > 0) {
        $location.search({
          keywords: $scope.postSearch.keywords
        });
      }
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

  function CreatePostCtrl($scope, AuthService, ForumServices, $location, subscribers) {
    $scope.data = {
      title: '',
      content: '',
      base_course_id: ''
    };

    $scope.subscribers = subscribers.data;

    $scope.postSearch = {
      keywords: ''
    };

    $scope.searchWithButton = function () {
      if ($scope.postSearch.keywords.length > 0) {
        $location.url('/forum').search({
          keywords: $scope.postSearch.keywords
        });
      }
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
        $location.url('/forum/post/' + data.slug);
      });
    };

    $scope.getListSubscription = function () {
      ForumServices.getListSubscription().success(function (data) {
        $scope.listSubscriptions = data.list_subscriptions;
      });
    };

    $scope.getListSubscription();
  }

  function PostDetailCtrl($scope, AuthService, $sce, ForumServices, $location, Post, subscribers) {
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.post = Post.data;
    var description = $scope.post.content.split('.')[0];
    $scope.post.created_time = Math.round((new Date('' + $scope.post.created_at)).getTime() / 1000);
    $scope.post.content = $sce.trustAsHtml($scope.post.content);

    $scope.max_page = 5;

    $scope.data = {
      content: '',
      id: $scope.post._id
    };

    $scope.subscribers = subscribers.data;

    $scope.postSearch = {
      keywords: ''
    };

    $scope.setPage = function (page) {
      $scope.data.page = page;
      ForumServices.listComment($scope.data).success(function (data) {
        $scope.post.comments = data.comments;
        $scope.page = data;
        $scope.currentPage = data.next_page - 1;
        $scope.total_items = data.total_page * 10;
      });
    };

    $scope.searchWithButton = function () {
      if ($scope.postSearch.keywords.length > 0) {
        $location.url('/forum').search({
          keywords: $scope.postSearch.keywords
        });
      }
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
        $scope.page = data;
        $scope.currentPage = data.next_page - 1;
        $scope.total_items = data.total_page * 10;
      });
    };

    $scope.listComment();

    $scope.setPage = function (page) {
      ForumServices.listComment({
        page: page,
        id: $scope.data.id
      }).success(function (data) {
        $scope.post.comments = data.comments;
        $scope.page = data;
      });
      return;
    };

    $scope.followPost = function () {
      if (!$scope.isAuthenticated()) return;
      ForumServices.followPost($scope.post).success(function () {
        $scope.post.follow = true;
      });
    };

    $scope.unfollowPost = function () {
      if (!$scope.isAuthenticated()) return;
      ForumServices.unFollowPost($scope.post).success(function () {
        $scope.post.follow = false;
      });
    };

    $scope.voteUpPost = function (post) {
      if (!$scope.isAuthenticated()) return;
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
      if (!$scope.isAuthenticated()) return;
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

    $scope.createComment = function () {
      if (!$scope.isAuthenticated()) return;
      if (!$scope.isSending && $scope.data.content != '') {
        ForumServices.creatComment($scope.data).success(function (data) {
          $scope.post.comments.push(data);
          $scope.post.total_comment = $scope.post.total_comment + 1;
          $scope.data.content = '';
        });
      }
    };

    /*
     * Vote up cho 1 comment
     * @comment: comment duoc vote
     */
    $scope.voteUpComment = function (comment) {
      if (!$scope.isAuthenticated()) return;
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
      if (!$scope.isAuthenticated()) return;
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

    $scope.reply = function (comment) {
      if (!$scope.isAuthenticated()) return;

      ForumServices.listReply({
        id: comment._id
      }).success(function (data) {
        $scope.replies = data.comments;
      });
    };

    $scope.sharePost = function () {
      FB.ui({
        method: 'feed',
        name: $scope.post.title,
        description: $scope.post.description,
        link: 'http://memo.com/forum/post/' + $scope.post.slug
      });
    };
  }

  angular.module('forum.controllers', ['forum.services'])
    .controller('ListPostCtrl', ['$scope', '$location', 'AuthService', 'ForumServices', 'allPosts', 'subscribers',
      'followingPosts', 'searchPosts', ListPostCtrl
    ])
    .controller('CreatePostCtrl', ['$scope', 'AuthService', 'ForumServices', '$location', 'subscribers',
      CreatePostCtrl
    ])
    .controller('PostDetailCtrl', ['$scope', 'AuthService', '$sce', 'ForumServices', '$location', 'Post',
      'subscribers',
      PostDetailCtrl
    ]);
}(window.angular));