(function (angular) {
  'use strict';

  function ProgressQuizPlayerCtrl($scope) {
    var ctrl = this;
    ctrl.progressQuiz = $scope.progressQuiz;
    $scope.$watch('progressQuiz', function () {
      ctrl.progressQuiz = $scope.progressQuiz;
    });
  }

  function ProgressQuizPlayer() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        progressQuiz: '='
      },
      controller: 'ProgressQuizPlayerCtrl',
      controllerAs: 'player',
      link: function ($scope, $element, $attrs) {
        var inputElement = $element.find('input').eq(0)[0] || $element.find('textarea').eq(0)[
          0];

        if (inputElement) {
          inputElement.focus();
        }

        // $element.bind('keydown', function (e, data) {
        //   if (e.keyCode === 8) {
        //     if (!inputElement) {
        //       e.preventDefault();
        //       e.stopPropagation();
        //       return false;
        //     }
        //   }
        // });
      },
      templateUrl: 'exam/progressQuiz/player/_player.html'
    }
  }

  angular.module('adaptiveTest.progressQuiz')
    .controller('ProgressQuizPlayerCtrl', ['$scope', ProgressQuizPlayerCtrl])
    .directive('progressQuizPlayer', ProgressQuizPlayer);
}(window.angular));