(function(angular) {
  'use strict';

  function SettingProfileService($http, $q, $localStorage) {
    var HOST = "http://api.memo.edu.vn/api",
      API_VERSION = "/v1.5",
      BASE_URL = HOST + API_VERSION;
    var Services = {};

    Services.linkFb = function(data) {
      // data = {fb_Id: 'asoetunh', fb_access_token: ''}
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
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
      // data = {gmail: 'asoetunh', fb_access_token: ''}
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
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

  function SettingProfile(SettingProfileService) {
  }

  function SettingProfileCtrl($scope, Profile) {
    $scope.profile = Profile.detail;
    $scope.user = Profile.user;
    $scope.user.created_at.date = convertCreatedAtTime($scope.user.created_at.sec);

    function convertCreatedAtTime(input) {
      return new Date(input * 1000);
    }

    $scope.linkFb = function() {
      console.log('Implementing');
    };
    $scope.linkGoogle = function() {
      console.log('Implementing');
    };
  }

  angular.module('settings.profile', [])
    .controller('SettingProfileCtrl', ['$scope', 'Profile', SettingProfileCtrl])
    .factory('SettingProfile', [SettingProfile]);

}(window.angular));