(function (angular) {
  'use strict';

  function DictionaryHintScreenCtrl($scope, ngAudio, Words) {
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

  angular.module('welcome')
    .controller('DictionaryHintScreenCtrl', ['$scope', 'ngAudio', 'Words',
      DictionaryHintScreenCtrl
    ])
    .directive('dictionaryHintScreen', function ($timeout, ngAudio, Words) {
      return {
        strict: 'EA',
        scope: {
          question: "=",
          currentData: "=",
          answer: "&"
        },
        controller: 'DictionaryHintScreenCtrl',
        controllerAs: 'hintScreen',
        link: function ($scope, $elemen, $attrs) {
          // FIXME: Good enough code
          var soundPlayingPromise;
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
              $scope.answer();
            }, 1000);

          };

          $scope.closeDefinitionDropdown = function (e) {
            var element = angular.element(e.target);
            // $timeout(function () {
            //   element.triggerHandler('click');
            // }, 1000);
          };
        },
        templateUrl: 'welcome/dictionaryHintScreen/_dictionary-hint-screen.html'
      };
    })
}(window.angular));