(function (angular) {

  'use strict';

  function PlazaConfig($routeProvider) {
    $routeProvider.when('/plaza', {
      templateUrl: 'plaza/_index.html',
      controller: 'PlazaCtrl',
      resolve: {
        getProfile: function (Profile) {
          return Profile.getProfile();
        },
        getProfileDetail: function (Profile) {
          return Profile.getProfileDetail();
        },
        getPlaza: function (Plaza) {
          return Plaza.get();
        },
        res1: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'week'
          });
        },
        res2: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'month'
          });
        },
        res3: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'all_time'
          });
        }
      }
    });
  }

  angular.module('plaza', ['plaza.services', 'plaza.controllers'])
    .config(['$routeProvider', PlazaConfig]);

}(window.angular));