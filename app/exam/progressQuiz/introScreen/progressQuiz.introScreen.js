(function (angular) {
  'use strict';

  function ProgressQuizIntroScreenCtrl($scope) {
    var ctrl = this;
  }

  function ProgressQuizIntroScreen() {
    return {
      restrict: 'EA',
      scope: {
        message: "@",
        description: "@"
      },
      controller: 'ProgressQuizIntroScreenCtrl',
      controllerAs: 'introScreen',
      templateUrl: 'exam/progressQuiz/introScreen/_intro-screen.html'
    };
  }

  angular.module('adaptiveTest.progressQuiz.introScreen', [])
    .controller('ProgressQuizIntroScreenCtrl', ['$scope', ProgressQuizIntroScreenCtrl])
    .directive('progressQuizIntroScreen', ProgressQuizIntroScreen);
}(window.angular));