(function (angular) {
  'use strict';

  function ProgressQuizConfig($routeProvider) {
    $routeProvider.when('/progressquiz', {
      templateUrl: 'exam/progressQuiz/_index.html',
      controller: 'ProgressQuizCtrl',
      controllerAs: 'progressQuizCtrl',
      resolve: {
        test: function (ProgressQuiz) {
          return ProgressQuiz.start();
        }
      }
    });
  }

  function ProgressQuizCtrl($scope, ProgressQuiz) {
    var ctrl = this;
    $scope.progressQuiz = ProgressQuiz;
  }

  angular.module('adaptiveTest.progressQuiz', [])
    .config(['$routeProvider', ProgressQuizConfig])
    .controller('ProgressQuizCtrl', ['$scope', 'ProgressQuiz', ProgressQuizCtrl]);
}(window.angular));