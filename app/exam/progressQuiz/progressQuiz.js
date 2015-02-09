(function (angular) {
  'use strict';

  function ProgressQuizConfig($routeProvider) {
    $routeProvider.when('/progressquiz', {
      templateUrl: 'exam/progressQuiz/_index.html',
      controller: 'ProgressQuizCtrl',
      controllerAs: 'progressQuizCtrl',
      // resolve: {
      //   test: function (ProgressQuiz) {
      //     return ProgressQuiz.start();
      //   }
      // }
    });
  }

  function ProgressQuizCtrl($scope, ProgressQuiz) {
    var ctrl = this;
    ProgressQuiz.start().then(function () {
      $scope.progressQuiz = ProgressQuiz;
    });
  }

  angular.module('adaptiveTest.progressQuiz', ['adaptiveTest.progressQuiz.quitLink'])
    .config(['$routeProvider', ProgressQuizConfig])
    .controller('ProgressQuizCtrl', ['$scope', 'ProgressQuiz', ProgressQuizCtrl]);
}(window.angular));