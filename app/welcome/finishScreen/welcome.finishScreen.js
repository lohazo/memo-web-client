(function (angular) {
  'use strict';

  function FinishScreenCtrl($scope) {

  }

  angular.module('welcome.finishScreen', [])
    .controller('FinishScreenCtrl', ['$scope', FinishScreenCtrl])
    .directive('welcomeFinishScreen', function () {
      return {
        restrict: 'EA',
        scope: {},
        controller: 'FinishScreenCtrl',
        controllerAs: 'finishScreen',
        templateUrl: 'welcome/finishScreen/_finish-screen.html'
      };
    });
}(window.angular));