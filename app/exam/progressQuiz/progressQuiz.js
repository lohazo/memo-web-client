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

  function ProgressQuizCtrl($scope, ProgressQuiz, AppSetting, $rootScope) {
    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    });

    var ctrl = this;
    // ProgressQuiz.start().then(function () {
    $scope.progressQuiz = ProgressQuiz;
    // });
  }

  angular.module('adaptiveTest.progressQuiz', ['adaptiveTest.progressQuiz.quitLink',
      'adaptiveTest.progressQuiz.introScreen', 'adaptiveTest.progressQuiz.finishScreen'
    ])
    .config(['$routeProvider', ProgressQuizConfig])
    .controller('ProgressQuizCtrl', ['$scope', 'ProgressQuiz', 'AppSetting', '$rootScope', ProgressQuizCtrl]);
}(window.angular));