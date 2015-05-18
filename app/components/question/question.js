(function(angular) {

  'use strict';

  function questionFailure() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'components/question/_question-failure.html'
    };
  }

  function questionSuccess() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'components/question/_question-success.html'
    };
  }

  function questionLastScreen() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'components/question/_question-last-screen.html'
    };
  }

  angular.module('question', [
      'question.select',
      'question.translate',
      'question.judge',
      'question.name',
      'question.listen',
      'question.form',
      'question.speak',
      'question.services'
    ]);
  angular.module('question')
    .directive('questionFailure', questionFailure)
    .directive('questionSuccess', questionSuccess)
    .directive('questionLastScreen', questionLastScreen);
  

}(window.angular));