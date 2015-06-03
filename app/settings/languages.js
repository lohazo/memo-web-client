(function (angular) {

  'use strict';

  function SettingLanguageCtrl($scope, Course, AppSetting, $rootScope, $translate, $localStorage) {
    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    });

    $translate.use($localStorage.auth.user.display_lang);

    Course.listUserCourses().then(function () {
      $scope.userCourses = Course.userCourses;
      $scope.course = $scope.userCourses.filter(function (course) {
        return Course.getCurrentCourse() === course.base_course_id;
      })[0] || {};
    });

    $scope.saveChanges = function () {
      Course.selectCourse({
        base_course_id: $scope.course.base_course_id
      });
    };
  }

  angular.module('settings.languages', [])
    .controller('SettingLanguageCtrl', ['$scope', 'Course', 'AppSetting', '$rootScope', '$translate', '$localStorage', SettingLanguageCtrl]);

}(window.angular));