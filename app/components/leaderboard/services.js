(function (angular) {
  'use strict';

  function LeaderboardServices($http, $q, $localStorage) {
    var HOST = "http://api.memo.edu.vn/api",
      API_VERSION = "/v1.5",
      BASE_URL = HOST + API_VERSION;
    var Services = {};

    Services.fbFriends = function (data) {
      var deferred = $q.defer();

      $http.get('/assets/data/fb_friends.json')
        .then(function (fbFriends) {
          deferred.resolve(fbFriends);
        });

      return deferred.promise;
    };

    Services.friends = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;

      $http.post(BASE_URL + '/users/search_friends', data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.follow = function (data) {
        var deferred = $q.defer();
        var authToken = $localStorage.auth.user.auth_token;
        data.auth_token = authToken;

        $http.post(BASE_URL + '/users/follow', data)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
    };

    Services.unfollow = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;

        $http.post(BASE_URL + '/users/unfollow', data)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
    };

    return Services;
  }

  function LeaderboardFactory(LeaderboardServices) {
      var Leaderboard = {};

      Leaderboard.fbFriends = function(data) {
        return LeaderboardServices.fbFriends(data);
      };

      Leaderboard.friends = function(data) {
        return LeaderboardServices.friends(data);
      };

      Leaderboard.follow = function (data) {
        return LeaderboardServices.follow(data);
      }

      Leaderboard.unfollow = function (data) {
        return LeaderboardServices.unfollow(data);
      }
      return Leaderboard;
  }

  angular.module('leaderboard.services', [])
    .factory('Leaderboard', ['LeaderboardServices', LeaderboardFactory])
    .factory('LeaderboardServices', ['$http', '$q', '$localStorage', LeaderboardServices]);

}(window.angular));