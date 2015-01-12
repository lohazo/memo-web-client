(function (angular) {
  'use strict';

  function ProfileServices($http, $q, $location, $localStorage, API_PHP) {
    var Services = {};

    Services.profile = function (data) {
      // data = {_id: }
      var deferred = $q.defer();
      var requestData = {
        '_id': $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      $http.get(API_PHP + '/users/' + requestData._id + '?auth_token=' + requestData.auth_token)
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
      // data = {_id: }
      var deferred = $q.defer();
      var requestData = {
        '_id': $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      $http.get(API_PHP + '/users/profile_details' + '?device=web&auth_token=' + requestData.auth_token +
          '&id=' + requestData._id)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.update = function (data) {
      var deferred = $q.defer();

      // data = {username: 'asonetuh'/ password: 'anoethuasto'/ email: 'asoentuh'}
      data.auth_token = $localStorage.auth.user.auth_token;

      $http.post(API_PHP + '/users/edit', data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function ProfileFactory(ProfileServices, $localStorage) {
    var Profile = {};

    if (!$localStorage.auth) {
      $localStorage.auth = {};
    };

    Profile.user = $localStorage.auth.user || {};
    Profile.detail = $localStorage.auth.profile_detail || {};

    Profile.getUser = function () {
      Profile.user = $localStorage.auth ? ($localStorage.auth.user || {}) : {};
      return Profile.user;
    };

    Profile.getProfile = function (data) {
      // data = {_id}
      return ProfileServices.profile(data)
        .then(function (response) {
          $localStorage.auth.user = response.data.user_info;
          $localStorage.auth.skills_tree = response.data.skills_tree;
          $localStorage.auth.checkpoints = response.data.checkpoints;
          $localStorage.auth.skills = response.data.skills;
          Profile.user = response.data.user_info;
        });
    };

    Profile.getProfileDetail = function (data) {
      // data = {_id:}
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
    .factory('ProfileServices', ['$http', '$q', '$location', '$localStorage', 'API_PHP',
      ProfileServices
    ])
    .factory('Profile', ['ProfileServices', '$localStorage', ProfileFactory]);
}(window.angular));