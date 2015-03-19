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

  function ListPostCtrl($scope){
    
    $scope.post = [{
      'avatar': "u",
      'title': "abc"
    }]

    // Avatar cua mot post
    // Title cua mot post
    // So comment
    // Decription : Nguoi post -  Ngay post - Course Chu de


    // Cac chu de
        // Khi nhan vao cac tab 
          // Tab chu de moi : -  Hien thi ra danh sach cac bai post moi nhat
          // Tab chu de nong: - Hien thi ra danh sach cac bai post duoc thao luan nhieu
          // Tab theo doi : - Hien thi ra danh sach cai bai post duoc theo doi

    // avatar : Hien thi ra avatar
    // comment : Hien thi ra so comment 
    // search : Nhap text vao de lam sao Controller nhan duoc text de xu ly ?
    // kenh theo doi chu de , theo doi cac chu de tieng Anh, Phap ....

  }

  angular.module('forum.controllers', ['forum.services'])
  .controller('ListPostCtrl', ['$scope', ListPostCtrl])
  .controller('CreatePostCtrl', ['$scope', 'ForumServices', CreatePostCtrl])
  .controller('PostDetailCtrl', ['$scope', 'ForumServices', 'Forum', PostDetailCtrl]);
}(window.angular));

