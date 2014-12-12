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
        gmail: $localStorage.auth.facebook.userID,
        g_access_token: $localStorage.auth.facebook.accessToken
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

      $http.post(BASE_URL + '/users/unlink_facebook', {
          auth_token: authToken
        })
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function SettingProfileFactory(SettingProfileService, Leaderboard) {
    var SettingProfile = {};

    SettingProfile.linkFb = function (data) {
      return Leaderboard.fbLogin().then(SettingProfileService.linkFb)
        .then(function (response) {
          console.log(response);
        });
    };

    SettingProfile.linkGoogle = function (data) {
      return SettingProfileService.linkGoogle(data)
        .then(function (response) {
          console.log(response);
        });
    };

    return SettingProfile;
  }

  function SettingProfileCtrl($scope, Profile, SettingProfile) {
    $scope.profile = Profile.detail;
    $scope.user = Profile.user;
    $scope.user.created_at.date = convertCreatedAtTime($scope.user.created_at.sec);

    function convertCreatedAtTime(input) {
      return new Date(input * 1000);
    }

    $scope.linkFb = function() {
      SettingProfile.linkFb();
    };

    $scope.linkGoogle = function() {
      console.log('Implementing');
    };
  }

  angular.module('settings.profile', [])
    .controller('SettingProfileCtrl', ['$scope', 'Profile', 'SettingProfile', SettingProfileCtrl])
    .factory('SettingProfileService', ['$http', '$q', '$localStorage', SettingProfileService])
    .factory('SettingProfile', ['SettingProfileService', 'Leaderboard', SettingProfileFactory]);

}(window.angular));