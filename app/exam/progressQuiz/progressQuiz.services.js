(function (angular) {
  'use strict';

  function ProgressQuiz(AdaptiveTestServices) {
    var progressQuiz = {
      progressQuizLogId: {},
      currentData: {
        question: {},
        userAnswer: {} // = {result, correctAnswer, userAnswer, answerOptions:}
      }
    };

    var settings = {};

    function init() {
      progressQuiz.exam = {};
      progressQuiz.currentData = {
        question: {},
        userAnswer: {}
      };
      progressQuiz.settings = angular.copy(settings);
    }

    progressQuiz.start = function () {
      return AdaptiveTestServices.start({
        type: 'progress_quiz'
      }).then(function (response) {
        init();
        progressQuiz.progressQuizLogId = response.data.progress_quiz_log_id;
        progressQuiz.currentData.question = response.data;
      });
    };

    progressQuiz.submitAnswer = function () {
      var answer = {};
      answer[progressQuiz.currentData.question.question_log_id] = progressQuiz.currentData.userAnswer
        .result;
      return AdaptiveTestServices.submitAnswer({
        _id: currentData.progress_quiz_log_id,
        exam_token: currentData.exam_token,
        type: 'progress_quiz',
        answer: answer
      }).then(function (response) {
        progressQuiz.currentData.question = response.data;
      });
    }

    return progressQuiz;
  }

  angular.module('adaptiveTest.progressQuiz')
    .factory('ProgressQuiz', ['AdaptiveTestServices', ProgressQuiz]);
}(window.angular));