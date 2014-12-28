(function(angular) {
  'use strict';

  function ProfileConfig($routeProvider) {
    $routeProvider.when('/user', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileCtrl',
      resolve: {
        getProfile: function(Profile) {
          return Profile.getProfile();
        }
      }
    });
  }

  function ProfileCtrl($scope, Profile) {

  }

  angular.module('profile', ['profile.services'])
    .controller('ProfileCtrl', ['$scope', 'Profile', ProfileCtrl])
    .config(['$routeProvider', ProfileConfig]);
}(window.angular));