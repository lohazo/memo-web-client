(function (angular) {
  'use strict';

  function ProfileConfig($routeProvider) {
    $routeProvider.when('/profile', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileCtrl',
      resolve: {
        getProfile: function (Profile) {
          return Profile.getProfile();
        },
        getProfileDetail: function (Profile) {
          return Profile.getProfileDetail();
        }
      }
    });
  }

  function ProfileCtrl($scope, Profile) {
    $scope.profile = Profile.user;
    $scope.profileDetail = Profile.detail;
    var ownedCourses = $scope.profileDetail.owned_courses;
    $scope.ownedCourses = [];
    var i = 0;
    for (i = 0; i < ownedCourses.length; i = i + 2) {
      $scope.ownedCourses.push([ownedCourses[i], ownedCourses[i + 1]]);
    }
  }

  angular.module('profile', ['profile.services'])
    .controller('ProfileCtrl', ['$scope', 'Profile', ProfileCtrl])
    .config(['$routeProvider', ProfileConfig]);
}(window.angular));