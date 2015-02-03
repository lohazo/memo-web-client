(function (angular) {
  'use strict';

  function WelcomeQuestionScreenCtrl($scope) {
    var ctrl = this;
    ctrl.a = "1";
    ctrl.type = 'translate';
    $scope.a = ctrl.a;
  }

  function WelcomeQuestionTranslateCtrl($scope) {
    var ctrl = this;
    ctrl.a = '2';
  }

  angular.module('welcome.questionScreen', []);
  angular.module('welcome.questionScreen')
    .controller('WelcomeQuestionScreenCtrl', ['$scope', WelcomeQuestionScreenCtrl])
    .controller('WelcomeQuestionTranslateCtrl', ['$scope', WelcomeQuestionTranslateCtrl])
    .directive('welcomeQuestionScreen', function () {
      return {
        strict: 'EA',
        scope: true,
        controller: 'WelcomeQuestionScreenCtrl',
        controllerAs: 'questionScreen',
        template: '<welcome-question-translate></welcome-question-translate>'
      };
    })
    .directive('welcomeQuestionTranslate', function () {
      return {
        strict: 'EA',
        replace: true,
        scope: true,
        controller: 'WelcomeQuestionTranslateCtrl',
        controllerAs: 'questionTranslate',
        templateUrl: 'welcome/questionScreen/_question-translate.html'
      };
    });
}(window.angular));