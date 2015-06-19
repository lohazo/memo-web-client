(function (angular) {

  'use strict';

  function IslandConfig($routeProvider) {
    $routeProvider.when('/island', {
      templateUrl: 'island/_island-1.html',
      controller: 'IslandCtrl'
    });
  }

  angular.module('island', ['island.controllers'])
    .config(['$routeProvider', IslandConfig])
}(window.angular));