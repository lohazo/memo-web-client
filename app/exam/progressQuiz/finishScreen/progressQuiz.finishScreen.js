(function (angular) {
  'use strict';

  function ProgressQuizFinishScreenCtrl($scope) {
    var ctrl = this;
  }

  function ProgressQuizFinishScreen() {
    return {
      restrict: 'EA',
      scope: {
        data: "="
      },
      controller: 'ProgressQuizFinishScreenCtrl',
      controllerAs: 'finishScreen',
      templateUrl: 'exam/progressQuiz/finishScreen/_finish-screen.html'
    };
  }

  angular.module('adaptiveTest.progressQuiz.finishScreen', [])
    .controller('ProgressQuizFinishScreenCtrl', ['$scope', ProgressQuizFinishScreenCtrl])
    .directive('progressQuizFinishScreen', ProgressQuizFinishScreen)
}(window.angular));