(function(angular) {
  'use strict';

  function SettingProfileService($http, $q, $localStorage) {
    var HOST = "http://api.memo.edu.vn/api",
      API_VERSION = "/v1.5",
      BASE_URL = HOST + API_VERSION;
    var Services = {};

    Services.linkFb = function() {
      var deferred = $q.defer();

      var data = {
        auth_token: $localStorage.auth.user.auth_token,
        fb_Id: $localStorage.auth.facebook.userID,
        fb_access_token: $localStorage.auth.facebook.accessToken
      };

      $http.post(BASE_URL + '/users/link_facebook', data)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        })

      return deferred.promise;
    };

    Services.unlinkFb = function() {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.post(BASE_URL + '/users/unlink_facebook', {
          auth_token: authToken
        })
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.linkGoogle = function() {
      var deferred = $q.defer();

      var data = {
        auth_token: $localStorage.auth.user.auth_token,
        gmail: $localStorage.auth.google.gmail,
        g_access_token: $localStorage.auth.google.accessToken
      };

      $http.post(BASE_URL + '/users/link_google', data)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        })

      return deferred.promise;
    };

    Services.unlinkGoogle = function() {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.post(BASE_URL + '/users/unlink_google', {
          auth_token: authToken
        })
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function SettingProfileFactory($localStorage, SettingProfileService, Leaderboard, GooglePlus) {
    var SettingProfile = {};

    SettingProfile.linkFb = function (data) {
      return Leaderboard.fbLogin().then(SettingProfileService.linkFb);
    };

    SettingProfile.linkGoogle = function () {
      $localStorage.auth.google = {};
      return GooglePlus.login()
        .then(function (response) {
          $localStorage.auth.google.accessToken = response.access_token;
        })
        .then(GooglePlus.getUser)
        .then(function (response) {
          $localStorage.auth.google.gmail = response.email;
        })
        .then(SettingProfileService.linkGoogle);
    };

    SettingProfile.unlinkFb = function () {
      return SettingProfileService.unlinkFb();
    };

    SettingProfile.unlinkGoogle = function () {
      return SettingProfileService.unlinkGoogle();
    };

    return SettingProfile;
  }

  function SettingProfileCtrl($scope, Profile, SettingProfile) {
    $scope.profile = Profile.detail;

    updateUser();

    function convertCreatedAtTime(input) {
      var output = new Date(input * 1000);
      output = output.getFullYear() + '-' + (output.getMonth() + 1) + '-' + output.getDate();
      return output;
    }

    function updateUser() {
      $scope.user = Profile.user;
      $scope.user.created_at.date = convertCreatedAtTime($scope.user.created_at.sec);
    }

    $scope.linkFb = function() {
      SettingProfile.linkFb()
        .then(Profile.getProfile)
        .then(updateUser);
    };

    $scope.linkGoogle = function() {
      SettingProfile.linkGoogle()
        .then(Profile.getProfile)
        .then(updateUser);
    };

    $scope.unlinkFb = function() {
      SettingProfile.unlinkFb()
        .then(Profile.getProfile)
        .then(updateUser);
    };

    $scope.unlinkGoogle = function() {
      SettingProfile.unlinkGoogle()
        .then(Profile.getProfile)
        .then(updateUser);
    };
  }

  angular.module('settings.profile', [])
    .controller('SettingProfileCtrl', ['$scope', 'Profile', 'SettingProfile', SettingProfileCtrl])
    .factory('SettingProfileService', ['$http', '$q', '$localStorage', SettingProfileService])
    .factory('SettingProfile', ['$localStorage', 'SettingProfileService', 'Leaderboard', 'GooglePlus', SettingProfileFactory]);

}(window.angular));