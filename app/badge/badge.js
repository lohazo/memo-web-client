(function (angular) {
  'use strict';
  function badgeConfig ($routeProvider) {
    $routeProvider.when('/badge', {
      templateUrl:'badge/_badge.html',
      controller: 'badgeCtrl'
    })
  }

  angular.module('badge', ['badge.services', 'badge.controllers'])
      .config(['$routeProvider', badgeConfig])
}(window.angular));