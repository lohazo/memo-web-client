(function (angular) {
  'use strict';

  function ExamCtrl($scope, $timeout, $routeParams, $location, Exam, Question, Sound, MemoTracker,
    Skill, $modal, $localStorage, ForumServices) {
    var examType = $location.path().split('/')[1].trim();
    var skill = Skill.skill($routeParams.id);
    $scope.shouldPlaySlow = false;
    var threeFirstSkills = ['en-vi_co_ban_1', 'en-vi_co_ban_2',
      'en-vi_nhung_nhom_tu_thong_dung'
    ];
    var requestData = {
      type: examType === 'skill' ? 'lesson' : examType
    };
    $scope.examType = requestData.type;
    if (examType === 'skill') {
      requestData.lesson_number = $routeParams.lesson_number;
      requestData.skill_id = $routeParams.id;
      if (threeFirstSkills.indexOf(skill._id) >= 0) {
        $scope.shouldPlaySlow = true;
      }
    } else if (examType === 'checkpoint') {
      requestData.checkpoint_position = $routeParams.checkpoint_position;
    } else if (examType === 'shortcut') {
      if (!skill.allow_shortcut) {
        $location.path('/');
      }
      requestData.skill_id = $routeParams.id;
    }

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
        returnPath += '/' + $routeParams.id;
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
          Exam.skip();
          Sound.playHeartLostSound();
          $scope.hearts = Exam.hearts();
          $scope.checkState();
        } else {
          Exam.check();
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
        $scope.question = {
          "type": "translate",
          "question": "Màu xanh lá cây? Màu đen?",
          "answer": "The green? The black?",
          "answer_lang": "en",
          "alternative_answers": [
            "Green? Black?",
            "Green or Black?",
            "The green or the black?"
          ],
          "common_errors": [],
          "normal_question_audio": "",
          "underline_words": [],
          "highlighted_words": [],
          "question_log_id": "5524ef656d6169126b6d0100"
        };
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

  function DiscussionExamModalCtrl($scope, $location, Exam, ExamStrengthen, $localStorage, ForumServices,
    $modalInstance) {
    $scope.question = Exam.question() || ExamStrengthen.question();
    $scope.requestData = {
      content: ''
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.data = {};
    $scope.data.question_log_id = $scope.question.question_log_id;
    $scope.data.base_course_id = $localStorage.auth.user.current_course_id;

    if ($scope.question.type == 'judge') {
      $scope.data.title = $scope.question.question;
      $scope.data.content = $scope.question.hints;
    } else if ($scope.question.type == 'name' || $scope.question.type == 'select') {
      $scope.data.title = $scope.question.question;
      $scope.data.content = $scope.question.hint;
    } else if ($scope.question.type == 'translate') {
      $scope.data.title = $scope.question.question;
      $scope.data.content = $scope.question.answer;
    };

    ForumServices.createPost($scope.data).success(function (data) {
      $scope.data.id = data._id;
      $scope.dataPost = data;
      ForumServices.getPost($scope.data).success(function (data) {
        $scope.data.id = data._id;
        $scope.getPost = data;
        ForumServices.listComment($scope.data).success(function (data) {
          $scope.listComment = data;
        });
      });
    });

    $scope.followPost = function () {
      ForumServices.followPost($scope.getPost).success(function () {
        $scope.getPost.follow = true;
      });
    };

    $scope.unfollowPost = function () {
      ForumServices.unFollowPost($scope.getPost).success(function () {
        $scope.getPost.follow = false;
      });
    };

    $scope.createComment = function () {
      $scope.requestData.id = $scope.getPost._id;
      ForumServices.creatComment($scope.requestData).success(function (data) {
        $scope.listComment.comments.push(data);
      });
    };

    $scope.voteUpComment = function (comment) {
      if (comment.is_vote_up) {
        comment.up_vote_count = comment.up_vote_count - 1;
      } else {
        comment.up_vote_count = comment.up_vote_count + 1;
        if (comment.is_vote_down) {
          comment.down_vote_count = comment.down_vote_count - 1;
          comment.is_vote_down = false;
        }
      }
      comment.is_vote_up = !comment.is_vote_up;
      ForumServices.voteComment({
        id: comment._id,
        type: 'upvote',
        vote: comment.is_vote_up
      });
    };

    $scope.voteDownComment = function (comment) {
      if (comment.is_vote_down) {
        comment.down_vote_count = comment.down_vote_count - 1;
      } else {
        comment.down_vote_count = comment.down_vote_count + 1;
        if (comment.is_vote_up) {
          comment.up_vote_count = comment.up_vote_count - 1;
          comment.is_vote_up = false;
        }
      }
      comment.is_vote_down = !comment.is_vote_down;
      ForumServices.voteComment({
        id: comment._id,
        type: 'downvote',
        vote: comment.is_vote_down
      });
    };
  }

  angular.module('exam.controllers', ['ngSanitize'])
    .controller('ExamCtrl', [
      '$scope', '$timeout', '$routeParams', '$location', 'Exam', 'Question', 'Sound',
      'MemoTracking', 'Skill', '$modal', '$localStorage', 'ForumServices', ExamCtrl
    ])
    .controller('DiscussionExamModalCtrl', ['$scope', '$location', 'Exam', 'ExamStrengthen', '$localStorage',
      'ForumServices', '$modalInstance', DiscussionExamModalCtrl
    ]);
}(window.angular));