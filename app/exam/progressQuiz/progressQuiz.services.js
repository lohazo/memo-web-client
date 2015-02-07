(function (angular) {
  'use strict';

  function ProgressQuiz($location, AdaptiveTestServices, Question) {
    var progressQuiz = {
      progressQuizLogId: {},
      currentData: {},
      userData: {
        answer: {},
        userAnswer: {}
      }
    };

    var settings = {
      header: {
        hide: false,
        left: {
          quitLink: {
            hide: false,
            text: ''
          }
        }
      },
      footer: {
        hide: false,
        left: {
          skipButton: {
            hide: true,
            disable: false,
            text: 'Bỏ qua'
          }
        },
        right: {
          continueButton: {
            hide: false,
            disable: false,
            text: ''
          }
        }
      },
      disableDictionary: true
    };

    function init() {
      progressQuiz.currentData = {};
      progressQuiz.userData = {
        answer: {},
        userAnswer: {}
      };
      progressQuiz.settings = angular.copy(settings);
    }

    progressQuiz.answer = function () {
      if (progressQuiz.currentData.question.type !== 'finish') {
        if (progressQuiz.userData.answer.userAnswer) {
          progressQuiz.submitAnswer();
        } else {
          var result = Question.check(progressQuiz.currentData.question, progressQuiz.userData
            .userAnswer);
          progressQuiz.userData.answer = result;

          progressQuiz.settings.footer.right.continueButton.text = 'Tiếp tục';
        }
      } else {
        $location.url('/');
      }
    };

    progressQuiz.quit = function () {
      init();
      $location.url('/');
    };

    progressQuiz.start = function () {
      return AdaptiveTestServices.start({
        type: 'progress_quiz'
      }).then(function (response) {
        init();
        progressQuiz.currentData = response.data;
        //
        progressQuiz.settings.footer.right.continueButton.text = 'Kiểm tra';
        progressQuiz.settings.footer.right.continueButton.disable = true;
      });
    };

    progressQuiz.submitAnswer = function () {
      var answer = {};
      answer[progressQuiz.currentData.question.question_log_id] = progressQuiz.userData.answer
        .result;
      progressQuiz.currentData.question.type = "";
      return AdaptiveTestServices.submitAnswer({
        _id: progressQuiz.currentData.progress_quiz_log_id,
        exam_token: progressQuiz.currentData.exam_token,
        type: 'progress_quiz',
        answer: answer
      }).then(function (response) {
        progressQuiz.currentData = response.data;
        progressQuiz.userData.answer = {};

        if (progressQuiz.currentData.question.score) {
          // It's finished
          progressQuiz.settings.header.hide = true;
          progressQuiz.currentData.question.type = "finish";
        } else {
          progressQuiz.settings.footer.right.continueButton.disable = true;
        }
      });
    }

    return progressQuiz;
  }

  angular.module('adaptiveTest.progressQuiz')
    .service('ProgressQuiz', ['$location', 'AdaptiveTestServices', 'Question', ProgressQuiz]);
}(window.angular));