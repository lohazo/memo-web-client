(function (angular) {
  'use strict';

  function IslandConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/island/:id', {
      templateUrl: 'island/_index.html',     
      controller:'IslandMainCtrol'
    });
    
  }

  angular.module('island', ['island.directives', 'island.controllers'])
    .config(['$routeProvider', IslandConfig])
}(window.angular));