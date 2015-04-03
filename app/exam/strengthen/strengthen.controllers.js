(function (angular) {
  'use strict';

  function CoursePracticeCtrl($scope, $timeout, $location, Exam, Question, Sound, MemoTracker,
    Skill, $modal, $localStorage, ForumServices) {

    var requestData = {
      type: 'strengthen_all'
    };
    $scope.examType = 'strengthen_all';

    $scope.questionTpl = '';
    $scope.footerTpl = 'footer';
    $scope.isAutoFeedback = false;

    var questionTplId = {
      form: 'questionForm',
      judge: 'questionJudge',
      listen: 'questionListen',
      name: 'questionName',
      select: 'questionSelect',
      speak: 'questionSpeak',
      translate: 'questionTranslate',
      failure: 'questionFailure',
      success: 'questionSuccess'
    };

    var footerTplId = {
      footer: 'footer',
      failure: 'footerFailure',
      success: 'footerSuccess',
      result: 'footerResult'
    };

    $scope.question = {};
    $scope.result = {};
    $scope.hearts = {
      remaining: 0,
      lost: 0
    };
    $scope.userAnswer = '';
    $scope.objectives = [];

    $scope.useItem = function (item) {
      Exam.useItem(item);
      $scope.availableItems = Exam.availableItems();
    };

    $scope.quit = function (afterDoingTest, returnPath) {
      // Call Feedback API
      MemoTracker.track('quit exam lesson');
      if (afterDoingTest) {
        Exam.sendFeedbackLogs();
      }
      delete $scope.exam;
      if (returnPath === '/') {
        returnPath += '/';
      }
      $location.url(returnPath);
    };

    $scope.finish = function () {
      Exam.finish(requestData).then(function (response) {
        $scope.quit(true);
      });
    };

    $scope.replay = function () {
      $scope.questionTpl = "";
      $scope.footerTpl = "footer";
      $scope.questionState = "";
      $scope.hearts = {
        remaining: 0,
        lost: 0
      };
      $scope.questions = [];
      $scope.answered = 0;
      $timeout(function () {
        $scope.start();
      }, 1);
    };

    $scope.checkState = function () {
      var examState = Exam.checkState();
      if (examState.isFinished) {
        if (examState.isFail) {
          $scope.questionTpl = questionTplId.failure;
          $scope.footerTpl = "footerFailure";
          Sound.playFailSound();
          if (examType === 'checkpoint') {
            Exam.fail(requestData);
          }
        } else {
          // Call finish API
          Exam.finish(requestData).then(function () {
            $scope.questionTpl = questionTplId.success;
            $scope.footerTpl = "footerSuccess";
            $scope.question = Exam.question();
            $scope.expChart = {
              labels: $scope.question.exp_chart.days,
              datasets: [{
                label: "",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#848484",
                pointColor: "#810c15",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: $scope.question.exp_chart.exp
              }]
            };
          });
          Sound.playFinishSound();
        }
        return true;
      }
      return false;
    };

    $scope.autoFeedback = function () {
      Exam.logFeedback({
        question_log_id: $scope.question.question_log_id,
        user_answer: $scope.question.userAnswer || '',
        user_note: '',
        feedback_type_ids: [],
        auto_feedback: true
      });
    };

    $scope.userFeedback = function (userNote, feedbackTypeIds) {
      $scope.isAutoFeedback = false;
      Exam.logFeedback({
        question_log_id: $scope.question.question_log_id,
        user_answer: $scope.question.userAnswer || '',
        user_note: userNote,
        feedback_type_ids: feedbackTypeIds,
        auto_feedback: false
      });
    };

    $scope.skip = function () {
      $scope.result = Question.skip($scope.question, '');

      Exam.skip();
      Sound.playHeartLostSound();

      $scope.hearts = Exam.hearts();
      $scope.footerTpl = "footerResult";

      $scope.questionState = 'answered';
      $scope.checkState();
    };

    $scope.check = function () {
      if ($scope.question.userAnswer && $scope.question.userAnswer.length >
        0) {
        $scope.result = Question.check($scope.question, $scope.question.userAnswer);
        $scope.footerTpl = "footerResult";

        if (!$scope.result.result) {
          Exam.skip($scope.result);
          Sound.playHeartLostSound();
          $scope.hearts = Exam.hearts();
          $scope.checkState();
        } else {
          Exam.check($scope.result, $scope.objectives);
          Sound.playCorrectSound();
        }
        $scope.answered = Exam.answered();
        $scope.questionState = 'answered';
      }
    };

    $scope.nextQuestion = function () {
      if ($scope.isAutoFeedback) {
        $scope.autoFeedback();
      }

      if (!$scope.checkState()) {
        $scope.questionTpl = "";
        $scope.footerTpl = "footer";
        $scope.questionState = "";
        $scope.objectives = [];

        // Aggressively update
        $timeout(function () {
          Exam.next();
          $scope.question = Exam.question();
          $scope.answered = Exam.answered();
          $scope.ant = Exam.questionPosition();
          $scope.question.userAnswer = "";
          $scope.questionTpl = questionTplId[$scope.question.type];
          $scope.isAutoFeedback = Exam.isAutoFeedback();
        }, 1);
      }
    };

    $scope.start = function () {
      Exam.start(requestData).then(function (response) {
        $scope.questions = Exam.questions();
        $scope.question = Exam.question();
        $scope.answered = Exam.answered();
        $scope.ant = 0;
        $scope.hearts = Exam.hearts();
        $scope.question.userAnswer = "";
        $scope.questionTpl = questionTplId[$scope.question.type];
        $scope.isAutoFeedback = Exam.isAutoFeedback();
        $scope.availableItems = Exam.availableItems();
      });
    };

    $scope.keyUpHandler = function (e) {
      if (e.keyCode === 13) {
        if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope.questionState && $scope.questionState === 'answered') {
            // $scope.check();
            $scope.nextQuestion();
          } else {
            $scope.check();
          }
        }
      }
    };

    $scope.start();

    $scope.discussion = function () {
      var modalInstance = $modal.open({
        templateUrl: 'forum/_discussion-exam.html',
        windowClass: 'discussion-popup-modal',
        controller: 'DiscussionExamModalCtrl'
      });
    };
  }

  function SkillPracticeCtrl($scope, $timeout, $routeParams, $location, Exam, Question, Sound, MemoTracker,
    Skill, $modal, $localStorage, ForumServices) {

    var requestData = {
      type: 'strengthen_skill',
      skill_id: $routeParams.skill_id
    };
    $scope.examType = 'strengthen_skill';

    $scope.questionTpl = '';
    $scope.footerTpl = 'footer';
    $scope.isAutoFeedback = false;

    var questionTplId = {
      form: 'questionForm',
      judge: 'questionJudge',
      listen: 'questionListen',
      name: 'questionName',
      select: 'questionSelect',
      speak: 'questionSpeak',
      translate: 'questionTranslate',
      failure: 'questionFailure',
      success: 'questionSuccess'
    };

    var footerTplId = {
      footer: 'footer',
      failure: 'footerFailure',
      success: 'footerSuccess',
      result: 'footerResult'
    };

    $scope.question = {};
    $scope.result = {};
    $scope.hearts = {
      remaining: 0,
      lost: 0
    };
    $scope.userAnswer = '';
    $scope.objectives = [];

    $scope.useItem = function (item) {
      Exam.useItem(item);
      $scope.availableItems = Exam.availableItems();
    };

    $scope.quit = function (afterDoingTest, returnPath) {
      // Call Feedback API
      MemoTracker.track('quit exam lesson');
      if (afterDoingTest) {
        Exam.sendFeedbackLogs();
      }
      delete $scope.exam;
      if (returnPath === '/skill') {
        returnPath += '/' + $routeParams.skill_id;
      }
      $location.url(returnPath);
    };

    $scope.finish = function () {
      Exam.finish(requestData).then(function (response) {
        $scope.quit(true);
      });
    };

    $scope.replay = function () {
      $scope.questionTpl = "";
      $scope.footerTpl = "footer";
      $scope.questionState = "";
      $scope.hearts = {
        remaining: 0,
        lost: 0
      };
      $scope.questions = [];
      $scope.answered = 0;
      $timeout(function () {
        $scope.start();
      }, 1);
    };

    $scope.checkState = function () {
      var examState = Exam.checkState();
      if (examState.isFinished) {
        if (examState.isFail) {
          $scope.questionTpl = questionTplId.failure;
          $scope.footerTpl = "footerFailure";
          Sound.playFailSound();
          if (examType === 'checkpoint') {
            Exam.fail(requestData);
          }
        } else {
          // Call finish API
          Exam.finish(requestData).then(function () {
            $scope.questionTpl = questionTplId.success;
            $scope.footerTpl = "footerSuccess";
            $scope.question = Exam.question();
            $scope.expChart = {
              labels: $scope.question.exp_chart.days,
              datasets: [{
                label: "",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#848484",
                pointColor: "#810c15",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: $scope.question.exp_chart.exp
              }]
            };
          });
          Sound.playFinishSound();
        }
        return true;
      }
      return false;
    };

    $scope.autoFeedback = function () {
      Exam.logFeedback({
        question_log_id: $scope.question.question_log_id,
        user_answer: $scope.question.userAnswer || '',
        user_note: '',
        feedback_type_ids: [],
        auto_feedback: true
      });
    };

    $scope.userFeedback = function (userNote, feedbackTypeIds) {
      $scope.isAutoFeedback = false;
      Exam.logFeedback({
        question_log_id: $scope.question.question_log_id,
        user_answer: $scope.question.userAnswer || '',
        user_note: userNote,
        feedback_type_ids: feedbackTypeIds,
        auto_feedback: false
      });
    };

    $scope.skip = function () {
      $scope.result = Question.skip($scope.question, '');

      Exam.skip();
      Sound.playHeartLostSound();

      $scope.hearts = Exam.hearts();
      $scope.footerTpl = "footerResult";

      $scope.questionState = 'answered';
      $scope.checkState();
    };

    $scope.check = function () {
      if ($scope.question.userAnswer && $scope.question.userAnswer.length >
        0) {
        $scope.result = Question.check($scope.question, $scope.question.userAnswer);
        $scope.footerTpl = "footerResult";

        if (!$scope.result.result) {
          Exam.skip($scope.result);
          Sound.playHeartLostSound();
          $scope.hearts = Exam.hearts();
          $scope.checkState();
        } else {
          Exam.check($scope.result, $scope.objectives);
          Sound.playCorrectSound();
        }
        $scope.answered = Exam.answered();
        $scope.questionState = 'answered';
      }
    };

    $scope.nextQuestion = function () {
      if ($scope.isAutoFeedback) {
        $scope.autoFeedback();
      }

      if (!$scope.checkState()) {
        $scope.questionTpl = "";
        $scope.footerTpl = "footer";
        $scope.questionState = "";
        $scope.objectives = [];

        // Aggressively update
        $timeout(function () {
          Exam.next();
          $scope.question = Exam.question();
          $scope.answered = Exam.answered();
          $scope.ant = Exam.questionPosition();
          $scope.question.userAnswer = "";
          $scope.questionTpl = questionTplId[$scope.question.type];
          $scope.isAutoFeedback = Exam.isAutoFeedback();
        }, 1);
      }
    };

    $scope.start = function () {
      Exam.start(requestData).then(function (response) {
        $scope.questions = Exam.questions();
        $scope.question = Exam.question();
        $scope.answered = Exam.answered();
        $scope.ant = 0;
        $scope.hearts = Exam.hearts();
        $scope.question.userAnswer = "";
        $scope.questionTpl = questionTplId[$scope.question.type];
        $scope.isAutoFeedback = Exam.isAutoFeedback();
        $scope.availableItems = Exam.availableItems();
      });
    };

    $scope.keyUpHandler = function (e) {
      if (e.keyCode === 13) {
        if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope.questionState && $scope.questionState === 'answered') {
            // $scope.check();
            $scope.nextQuestion();
          } else {
            $scope.check();
          }
        }
      }
    };

    $scope.start();

    $scope.discussion = function () {
      var modalInstance = $modal.open({
        templateUrl: 'forum/_discussion-exam.html',
        windowClass: 'discussion-popup-modal',
        controller: 'DiscussionExamModalCtrl'
      });
    };
  }

  angular.module('exam.strengthen')
    .controller('CoursePracticeCtrl', ['$scope', '$timeout', '$location', 'ExamStrengthen',
      'Question', 'Sound', 'MemoTracking', 'Skill', '$modal', '$localStorage', 'ForumServices', CoursePracticeCtrl
    ])
    .controller('SkillPracticeCtrl', ['$scope', '$timeout', '$routeParams', '$location', 'ExamStrengthen',
      'Question', 'Sound', 'MemoTracking', 'Skill', '$modal', '$localStorage', 'ForumServices', SkillPracticeCtrl
    ]);
}(window.angular));