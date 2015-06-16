(function (angular) {
  'use strict';

  function ProfileServices($http, $q, $location, $localStorage, API) {
    var Services = {};
    var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

    Services.profile = function (data) {
      // data = {_id: }
      var deferred = $q.defer();
      var requestData = {
        '_id': (data && data._id) ? data._id : $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      var endpoint = API + '/users/' + requestData._id + '/profile_details?platform=web&localize=' + localize + '&auth_token=' +
        requestData.auth_token;

      if (data) {
        endpoint += data.friend_id && data.friend_id.length > 0 ? '&friend_id=' + data.friend_id : '';
      }

      $http.get(API + '/users?platform=web&localize=' + localize + '&auth_token=' + requestData.auth_token)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          if (response.status === 422) {
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
        '_id': (data && data.friend_id) ? data.friend_id : $localStorage.auth.user._id,
        'auth_token': $localStorage.auth.user.auth_token
      };

      var endpoint = API + '/users/' + requestData._id + '/profile_details?platform=web&localize=' + localize + '&auth_token=' +
        requestData.auth_token;

      if (data) {
        endpoint += data.friend_id && data.friend_id.length > 0 ? '&friend_id=' + data.friend_id : '';
      }

      $http.get(endpoint)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.update = function (data) {
      var deferred = $q.defer();
      var userId = $localStorage.auth.user._id;
      // data = {username: 'asonetuh'/ password: 'anoethuasto'/ email: 'asoentuh'}
      data.auth_token = $localStorage.auth.user.auth_token;

      $http.put(API + '/users/' + userId, data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };
    
    /*
     * data = {birth_day: 12345}
     */
    Services.updateBirthday = function (data) {
      
      var userId = $localStorage.auth.user._id;
      
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/users/' + userId + '/update_birthday?platform=web&localize=' + localize, data);
    }

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
          if (!(data && data._id)) {
            $localStorage.auth.user = response.data.user_info;
            $localStorage.auth.skills_tree = response.data.skills_tree;
            $localStorage.auth.checkpoints = response.data.checkpoints;
            $localStorage.auth.skills = response.data.skills;
            Profile.user = response.data.user_info;
            $localStorage.displayTour = Profile.user.allow_tutorial;
          }
        });
    };

    Profile.getProfileDetail = function (data) {
      // data = {_id:}
      return ProfileServices.profileDetail(data)
        .then(function (response) {
          if (!(data && data._id)) {
            Profile.detail = response.data;
            $localStorage.auth.profile_detail = Profile.detail;
          }
        });
    };

    Profile.update = function (data) {
      // data = {email/password/username}
      return ProfileServices.update(data);
    };

    return Profile;
  }

  angular.module('profile.services', [])
    .factory('ProfileServices', ['$http', '$q', '$location', '$localStorage', 'API',
      ProfileServices
    ])
    .factory('Profile', ['ProfileServices', '$localStorage', ProfileFactory]);
}(window.angular));