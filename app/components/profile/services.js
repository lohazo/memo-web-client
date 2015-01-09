(function(angular) {
  'use strict';

  function ProfileServices($http, $q, $location, $localStorage, API_PHP) {
    var Services = {};

    Services.profile = function() {
      var deferred = $q.defer();
      var data = {
        '_id': $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      $http.get(API_PHP + '/users/' + data._id + '?auth_token=' + data.auth_token)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          if (response.status === 400) {
            $location.path('/course');
          }
          deferred.reject(response);
        });

      return deferred.promise;

    };

    Services.profileDetail = function() {
      var deferred = $q.defer();
      var data = {
        '_id': $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      $http.get(API_PHP + '/users/profile_details' + '?device=web&auth_token=' + data.auth_token)
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.update = function(data) {
      var deferred = $q.defer();

      // data = {username: 'asonetuh'/ password: 'anoethuasto'/ email: 'asoentuh'}
      data.auth_token = $localStorage.auth.user.auth_token;

      $http.post(API_PHP + '/users/edit', data)
        .then(function(response) {
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

    Profile.getUser = function() {
      return $localStorage.auth ? ($localStorage.auth.user || {}) : {};
    };

    Profile.getProfile = function() {
      return ProfileServices.profile()
        .then(function(response) {
          $localStorage.auth.user = response.data.user_info;
          $localStorage.auth.skills_tree = response.data.skills_tree;
          $localStorage.auth.checkpoints = response.data.checkpoints;
          $localStorage.auth.skills = response.data.skills;
          Profile.user = response.data.user_info;
        });
    };

    Profile.getProfileDetail = function() {
      return ProfileServices.profileDetail()
        .then(function(response) {
          Profile.detail = response.data;
          $localStorage.auth.profile_detail = Profile.detail;
        });
    };

    Profile.update = function(data) {
      // data = {email/password/username}
      return ProfileServices.update(data);
    };

    return Profile;
  }

  angular.module('profile.services', [])
    .factory('ProfileServices', ['$http', '$q', '$location', '$localStorage', 'API_PHP', ProfileServices])
    .factory('Profile', ['ProfileServices', '$localStorage', ProfileFactory]);
}(window.angular));