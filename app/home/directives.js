'use strict';

angular.module('home.directives', [])
  .directive('appMain', function() {
    return {
      strict: 'EA',
      scope: true,
      controller: 'HomeMainCtrl',
      templateUrl: 'home/_main.html'
    };
  })
  .directive('mainLeft', function() {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-left.html'
    };
  })
  .directive('mainCenter', function() {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-center.html'
    };
  })
  .directive('mainRight', function() {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'home/_main-right.html'
    };
  })
  .directive('placementTestModal', function() {
    return {
      strict: 'EA',
      controller: 'PlacementTestModalCtrl'
    };
  })
  .directive('leaderboard', function() {
    return {
      restrict: 'EA',
      scope: true,
      controller: 'LeaderboardCtrl',
      templateUrl: 'leaderboard/_index.html'
    };
  });