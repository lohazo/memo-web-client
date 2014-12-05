(function (angular) {

  'use strict';

  function SettingLanguageCtrl($scope, Course) {

    Course.listUserCourses().then(function () {
      $scope.userCourses = Course.userCourses;
      $scope.course = $scope.userCourses.filter(function (course) {
        return Course.getCurrentCourse() === course._id;
      })[0] || {};
      console.log($scope.course);
    });

    $scope.saveChanges = function() {
      Course.selectCourse({base_course_id: $scope.course._id});
    };
  }

  angular.module('settings.languages', [])
    .controller('SettingLanguageCtrl', ['$scope', 'Course', SettingLanguageCtrl]);

}(window.angular));