(function (angular) {
  'use strict';

  angular.module('home.directives', [])
    .directive('appMain', function () {
      return {
        strict: 'EA',
        scope: true,
        controller: 'HomeMainCtrl',
        templateUrl: 'home/_main.html'
      };
    });
}(window.angular));