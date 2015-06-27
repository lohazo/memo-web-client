(function (angular) {

  'use strict';

  function IslandConfig($routeProvider) {
    $routeProvider.when('/island', {
      templateUrl: 'island/_island-1.html',
      controller: 'IslandCtrl',
    });
  }

  function IslandCtrl($scope) {
    $scope.skills = [{
      "slug":"Cơ bản 1",
      "theme_color":"#ff4444",
    },{
      "slug":"Cơ bản 2",
      "theme_color":"#33b5e4",
    },{
      "slug":"Cơ bản 3",
      "theme_color":"#99cc00",
    },{
      "slug":"Cơ bản 4",
      "theme_color":"#ffba33",
    }]
  }

  angular.module('island', ['island.directives'])
    .config(['$routeProvider', IslandConfig])
    .controller('IslandCtrl', ['$scope', IslandCtrl])
}(window.angular));