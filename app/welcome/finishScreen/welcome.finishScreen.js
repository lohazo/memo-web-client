(function (angular) {
  'use strict';

  function FinishScreenCtrl($scope) {
    var ctrl = this;
    ctrl.finish = $scope.finish;
  }

  angular.module('welcome.finishScreen', [])
    .controller('FinishScreenCtrl', ['$scope', FinishScreenCtrl])
    .directive('welcomeFinishScreen', function () {
      return {
        restrict: 'EA',
        scope: {
          finish: "&"
        },
        controller: 'FinishScreenCtrl',
        controllerAs: 'finishScreen',
        templateUrl: 'welcome/finishScreen/_finish-screen.html'
      };
    });
}(window.angular));