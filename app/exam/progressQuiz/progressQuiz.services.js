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
      if (progressQuiz.currentData.isStarted) {
        progressQuiz.currentData.isStarted = false;
        progressQuiz.currentData.question.type = progressQuiz.currentData.question
          .type.split('|')[0];
        progressQuiz.settings.footer.right.continueButton.text = 'Kiểm tra';
        progressQuiz.settings.footer.right.continueButton.disable = true;
        return;
      }

      if (progressQuiz.currentData.isFinished) {
        init();
        $location.url('/');
        return;
      }

      if (progressQuiz.userData.answer.userAnswer) {
        progressQuiz.submitAnswer();
      } else {
        if (progressQuiz.userData.userAnswer && progressQuiz.userData.userAnswer.length > 0) {
          var result = Question.check(progressQuiz.currentData.question, progressQuiz.userData
            .userAnswer);
          progressQuiz.userData.answer = result;

          progressQuiz.settings.footer.right.continueButton.text = 'Tiếp tục';
        }
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
        progressQuiz.currentData.isStarted = true;
        progressQuiz.currentData.question.type += "|start";

        progressQuiz.settings.footer.right.continueButton.text = 'Bắt đầu kiểm tra';
      }, function (response) {
        progressQuiz.quit();
        // init();
        // progressQuiz.currentData = {
        //   "score": 0.15,
        //   "title": "Chúc mừng bạn đã hoàn thành",
        //   "result": "Bạn đã đạt được điểm ",
        //   "message": "Hãy tiếp tục cố gắng để nâng cao điểm số của bạn!",
        //   "course_quiz": "Bài kiểm tra Tiếng Anh!"
        // };
        // // progressQuiz.currentData.question.type += "|start";
        // progressQuiz.currentData.question = {
        //   type: 'finish'
        // };
        // progressQuiz.settings.header.hide = true;
        // //
        // progressQuiz.settings.footer.right.continueButton.text = 'Bắt đầu kiểm tra';
        // progressQuiz.settings.footer.right.continueButton.disable = false
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
        progressQuiz.userData.userAnswer = {};

        if (progressQuiz.currentData.score) {
          // It's finished
          progressQuiz.settings.header.hide = true;
          progressQuiz.currentData.isFinished = true;
          progressQuiz.currentData.question = {
            type: 'finish'
          };
        } else {
          progressQuiz.settings.footer.right.continueButton.text = 'Kiểm tra';
          progressQuiz.settings.footer.right.continueButton.disable = true;
        }
      });
    }

    return progressQuiz;
  }

  angular.module('adaptiveTest.progressQuiz')
    .service('ProgressQuiz', ['$location', 'AdaptiveTestServices', 'Question', ProgressQuiz]);
}(window.angular));