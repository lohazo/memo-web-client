(function (angular) {

  'use strict';

  function QuestionTranslateCtrl($scope, ngAudio, Words) {
    $scope.ngAudio = ngAudio;
    
    function tokenize(inputString) {
      var tokens = inputString.split(' ');
      return tokens.map(function (token) {
        var currentToken = token.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        return (Words.getWord(currentToken) || {text: currentToken});
      });
    }
    
    $scope.translate = $scope.$parent.question;
    $scope.translate_tokens = tokenize($scope.translate.question);

    if ($scope.translate.normal_question_audio) {
      var normalFile = ngAudio.load($scope.translate.normal_question_audio);

      $scope.speaker = {
        play: function() {
          normalFile.play();
        }
      };
      $scope.speaker.play();
    }
  }

  function QuestionTranslateDirective() {
    return {
      strict: 'EA',
      replace: true,
      scope: {
        answer: '='
      },
      link: function ($scope, $element) {
        $element.find('textarea').eq(0)[0].focus();
        $element.on('keydown', function (e) {
          if (e.keyCode === 13) {
            if ($scope.answer && $scope.answer.length > 0) {
              e.preventDefault();
              $element.find('textarea').eq(0).attr('readonly', 'readonly');
            }
          }
        });

        $scope.showDefinitionDropdown = function (e) {
          var element = angular.element(e.target);
          element.triggerHandler('click');

          var wordSound = $scope.ngAudio.load(element.attr('data-sound'));
          wordSound.play();
        };

        $scope.closeDefinitionDropdown = function (e) {
          var element = angular.element(e.target);
          element.triggerHandler('click');
        };
      },
      controller: 'QuestionTranslateCtrl',
      templateUrl: 'components/question/_question-translate.html'
    };
  }

  angular.module('question.translate', []);
  angular.module('question.translate')
    .controller('QuestionTranslateCtrl', ['$scope', 'ngAudio', 'Words', QuestionTranslateCtrl])
    .directive('questionTranslate', QuestionTranslateDirective);

}(window.angular));