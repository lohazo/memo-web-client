(function (angular) {

  'use strict';

  function IslandConfig($routeProvider) {
    $routeProvider.when('/island', {
      templateUrl: 'island/_island-1.html',
    });
  }

  angular.module('island', [])
    .config(['$routeProvider', IslandConfig])
}(window.angular));