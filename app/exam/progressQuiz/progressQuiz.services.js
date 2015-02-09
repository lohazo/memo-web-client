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
        var result = Question.check(progressQuiz.currentData.question, progressQuiz.userData
          .userAnswer);
        progressQuiz.userData.answer = result;

        progressQuiz.settings.footer.right.continueButton.text = 'Tiếp tục';
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
        init();
        progressQuiz.currentData = {
          "progress_quiz_log_id": "54d86c7e6d616928ff0c0000",
          "current_question": 1,
          "total_num_questions": 40,
          "exam_token": "E9_8qrS",
          "question": {
            "type": "listen",
            "question": "A man eats an egg.",
            "normal_question_audio": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-548e98566465622d45390000.mp3",
            "slow_question_audio": "http://admin.memo.edu.vn/uploads/sentence/audio/slow/slow-548e98566465622d45390000.mp3",
            "question_log_id": "54d86c7e6d616928ff0b0000"
          },
          "pre_score": 0.15,
          "message": "Lần mới đây điểm số bài kiểm tra của bạn là 0.15/10",
          "description": "Hãy thử đánh bại điểm số đó nào!"
        };
        //
        progressQuiz.currentData.question.type += "|start";
        //
        progressQuiz.settings.footer.right.continueButton.text = 'Bắt đầu kiểm tra';
        progressQuiz.settings.footer.right.continueButton.disable = false
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
          progressQuiz.currentData.isFinished = true;
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