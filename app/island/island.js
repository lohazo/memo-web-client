(function (angular) {
  'use strict';

  function IslandConfig($routeProvider) {
    $routeProvider.when('/island', {
      templateUrl: 'island/_index.html',
    });
  }

  angular.module('island', ['island.controllers','island.directives'])
    .config(['$routeProvider', IslandConfig]);
}(window.angular));