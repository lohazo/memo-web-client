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
    }

    $scope.getListSubscription = function() {
      ForumServices.getListSubscription().success(function(data) {
        $scope.listSubscriptions = data.list_subscriptions;
      })
    }

    $scope.getListSubscription();
  }

  function PostDetailCtrl($scope, ForumServices) {

  }

  function ListPostCtrl($scope){
    $scope.posts = [
    {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd' : "admin",
      'datetime': "12/12/15",
      "course" : "memoeee"
    },
    {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd' : "admin",
      'datetime': "12/12/15",
      "course" : "memoeee"
    },
    {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "122",
      'userd' : "admin",
      'datetime': "12/12/15",
      "course" : "memoeee"
    }
    ];
    $scope.tabPost = [
    {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "12",
      'userd' : "admin",
      'datetime': "12/12/15",
      "course" : "memoeee"
    }
    ];
    $scope.tabPostFollow = [
    {
      'avatar': "avatar",
      'title': "Các nguồn học Tiếng trung miễn phí",
      'comment': "1112",
      'userd' : "admin",
      'datetime': "12/12/15",
      "course" : "memoeee"
    }
    ];

    $scope.listPosts = function() {
      ForumServices.listPosts().success(function(data){
        $scope.listPosts = data.all_posts; 
      })
    }

    // search : Nhap text vao de lam sao Controller nhan duoc text de xu ly ?
    // kenh theo doi chu de , theo doi cac chu de tieng Anh, Phap ....
  }


  angular.module('forum.controllers', ['forum.services'])
  .controller('ListPostCtrl', ['$scope', ListPostCtrl])
  .controller('CreatePostCtrl', ['$scope', 'ForumServices', '$location', CreatePostCtrl])
  .controller('PostDetailCtrl', ['$scope', 'ForumServices', PostDetailCtrl]);
}(window.angular));
