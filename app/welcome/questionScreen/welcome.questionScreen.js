(function (angular) {
  'use strict';

  function WelcomeQuestionScreenCtrl($scope, ngAudio, Words) {
    var ctrl = this;

    function tokenize(inputString) {
      var tokens = inputString.split(' ');

      var fixedTokens = tokens.map(function (token) {
        return [].concat.apply(token.split(/(,|\.|!|\?|')/gi));
      }).reduce(function (token1, token2) {
        return token1.concat(token2);
      });

      return fixedTokens.map(function (token) {
        var currentToken = token.replace(/[-\/#$%\^&\*;:{}=\-_`~()]/g, "");
        // token = 'aString'
        var transformedToken = {
          text: currentToken
        };

        var objective = objectiveIds.filter(function (objective) {
          return objective.text.toLowerCase() === currentToken.toLowerCase();
        })[0];

        var specialObjective = specialObjectiveIds.filter(function (objective) {
          return objective.text.toLowerCase() === currentToken.toLowerCase();
        })[0];

        transformedToken.isPunctuation = (",.!?'".indexOf(currentToken) >= 0);
        transformedToken.isObjective = !!objective;
        transformedToken.isSpecialObjective = !!specialObjective;

        if (transformedToken.isObjective) {
          transformedToken._id = objective._id;
        } else if (transformedToken.isSpecialObjective) {
          transformedToken._id = specialObjective._id;
        } else {
          transformedToken._id = '';
        }

        return transformedToken; // {_id:, text:, isObjective:, isSpecialObjective:}
      }).map(function (token) {
        // {_id:, text:, isObjective:, isSpecialObjective:, definitions,...}
        return Words.getWord(token);
      });
    }

    ctrl.question = $scope.question;
    var specialObjectiveIds = angular.copy(ctrl.question.highlighted_words) || [];
    var objectiveIds = angular.copy(ctrl.question.underline_words) || [];
    ctrl.translate_tokens = tokenize(ctrl.question.question);

    if (ctrl.question.normal_question_audio) {
      var normalFile = ngAudio.load(ctrl.question.normal_question_audio);

      $scope.speaker = {
        play: function () {
          normalFile.play();
        }
      };
      $scope.speaker.play();
    }
  }

  angular.module('welcome.questionScreen', []);
  angular.module('welcome.questionScreen')
    .controller('WelcomeQuestionScreenCtrl', ['$scope', 'ngAudio', 'Words',
      WelcomeQuestionScreenCtrl
    ])
    .directive('welcomeQuestionScreen', function ($timeout, ngAudio, Words) {
      return {
        strict: 'EA',
        scope: {
          question: "=",
          continueButton: "=",
          userAnswer: "=",
          answer: "&"
        },
        controller: 'WelcomeQuestionScreenCtrl',
        controllerAs: 'questionScreen',
        link: function ($scope, $element, $attrs) {
          $element.find('textarea').eq(0)[0].focus();
          $element.bind('keydown', function (e) {
            if (e.keyCode === 13) {
              if (!($scope.translatedText && $scope.translatedText.length > 0)) {
                e.preventDefault();
              } else {
                $element.find('textarea').eq(0).attr('readonly', 'readonly');
              }
            }
          });
          // FIXME: Good enough code
          var soundPlayingPromise;

          $scope.$watch('translatedText', function () {
            $scope.userAnswer = $scope.translatedText;
            $scope.continueButton.disable = !($scope.translatedText && $scope.translatedText
              .length > 0);
          });

          $scope.showDefinitionDropdown = function (e) {
            var element = angular.element(e.target);

            if (soundPlayingPromise) {
              $timeout.cancel(soundPlayingPromise);
              soundPlayingPromise = null;
            }

            soundPlayingPromise = $timeout(function () {
              element.triggerHandler('click');

              var wordSound = ngAudio.load(element.attr('data-sound'));
              wordSound.play();
              Words.revealWords({
                words: JSON.stringify([element.attr('data-word-id')])
              });
            }, 1000);
          };
        },
        templateUrl: 'welcome/questionScreen/_question-translate.html'
      };
    });
}(window.angular));