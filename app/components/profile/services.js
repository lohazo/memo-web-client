(function (angular) {
  'use strict';

  function ProfileServices($http, $q, $location, $localStorage) {
    var HOST = "http://api.memo.edu.vn/api",
      API_VERSION = "/v1.5",
      BASE_URL = HOST + API_VERSION;

    var Services = {};

    Services.profile = function () {
      var deferred = $q.defer();
      var data = {
        '_id': $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      $http.get(BASE_URL + '/users/' + data._id + '?auth_token=' + data.auth_token)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          if (response.status === 400) {
            $location.path('/course');
          }
          deferred.reject(response);
        });

      return deferred.promise;

    };

    Services.profileDetail = function (data) {
      var deferred = $q.defer();

      $http.get(BASE_URL + '/users/profile_details' + '?device=web&auth_token=' + data.auth_token)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.update = function (data) {
      var deferred = $q.defer();

      // data = {username: 'asonetuh'/ password: 'anoethuasto'/ email: 'asoentuh'}
      data.auth_token = $localStorage.auth.user.auth_token;

      $http.post(BASE_URL + '/users/edit', data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function ProfileFactory(ProfileServices, $localStorage) {
    var Profile = {};

    Profile.user = $localStorage.auth.user || {};
    Profile.detail = $localStorage.auth.profile_detail || {};

    Profile.getProfile = function () {
      return ProfileServices.profile()
        .then(function (response) {
          $localStorage.auth.user = response.data.user_info;
          $localStorage.auth.skills_tree = response.data.skills_tree;
          $localStorage.auth.checkpoints = response.data.checkpoints;
          $localStorage.auth.skills = response.data.skills;
          Profile.user = response.data.user_info;
        });
    };

    Profile.getProfileDetail = function (data) {
      return ProfileServices.profileDetail(data)
        .then(function (response) {
          Profile.detail = response.data;
          $localStorage.auth.profile_detail = Profile.detail;
        });
    };

    Profile.update = function (data) {
      // data = {email/password/username}
      return ProfileServices.update(data);
    };

    return Profile;
  }

  angular.module('profile.services', [])
    .factory('ProfileServices', ['$http', '$q', '$location', '$localStorage', ProfileServices])
    .factory('Profile', ['ProfileServices', '$localStorage', ProfileFactory]);
}(window.angular));