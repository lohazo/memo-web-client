(function (angular) {
  'use strict';

  function QuestionListenCtrl($scope, ngAudio) {
    var normalFile = ngAudio.load($scope.question.normal_question_audio),
      slowFile = ngAudio.load($scope.question.slow_question_audio);

    $scope.speaker = {
      play: function () {
        normalFile.play();
      },
      slowPlay: function () {
        slowFile.play();
      }
    };

    $scope.speaker.play();
  }

  function questionListen() {
    return {
      restrict: 'EA',
      scope: {
        question: "=",
        userAnswer: "=",
        continueButton: "=",
        check: "&answer"
      },
      controller: 'QuizQuestionListenCtrl',
      controllerAs: 'questionListen',
      link: function ($scope, $element, $attrs) {
        $element[0].querySelector('input[type="text"]').focus();
        $scope.$watch('answer', function () {
          $scope.continueButton.disable = !($scope.answer && $scope.answer.length > 0);
          $scope.userAnswer = $scope.answer;
        });
        $element.on('keydown', function (e) {
          if (e.keyCode === 13) {
            if ($scope.answer && $scope.answer.length > 0) {
              e.preventDefault();
              $element[0].querySelector('input[type="text"]').setAttribute('readonly',
                'readonly');
              $scope.userAnswer = $scope.answer;
            }
          }
        });
      },
      templateUrl: 'components/question/questionListen/_question-listen.html'
    };
  }

  angular.module('question.listen', [])
    .directive('quizQuestionListen', questionListen)
    .controller('QuizQuestionListenCtrl', ['$scope', 'ngAudio', QuestionListenCtrl]);
}(window.angular));