(function (angular) {
  'use strict';

  function PlacementTestCtrl($scope, $location, PlacementTest, Question, Sound, $modal, $localStorage) {
    $scope.questionTpl = '';
    $scope.footerTpl = 'footer';
    $scope.posts = {};
    $scope.comments = {};

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
    $scope.userAnswer = '';
    $scope.exam_token = '';
    $scope.placementTestId = '';

    $scope.quit = function () {
      delete $scope.question;
      $location.url('/');
    };

    $scope.skip = function () {
      Sound.playHeartLostSound();
      $scope.result = Question.skip($scope.question, '');
      $scope.questionState = 'answered';
      $scope.footerTpl = "footerResult";
    };

    $scope.check = function () {
      if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
        $scope.result = Question.check($scope.question, $scope.question.userAnswer);
        $scope.footerTpl = "footerResult";
        if ($scope.result.result) {
          Sound.playCorrectSound();
        } else {
          Sound.playHeartLostSound();
        }
        $scope.questionState = 'answered';
      }
    };

    $scope.nextQuestion = function () {

      var requestData = {
        id: $scope.placementTestId,
        exam_token: $scope.exam_token
      };

      var tmp = {};
      tmp[$scope.question.question_log_id] = $scope.result.result;
      requestData.answer = angular.toJson(tmp);

      $scope.footerTpl = "footer";
      $scope.questionTpl = "";

      PlacementTest.submitAnswer(requestData)
        .then(function () {
          var responseData = PlacementTest.question;
          $scope.questionState = '';
          if (responseData.question) {
            $scope.question = responseData.question;
            $scope.question.userAnswer = "";
            $scope.questionTpl = questionTplId[$scope.question.type];
            $scope.num_questions = responseData.current_question;
            $scope.result = {};
            $scope.exam_token = responseData.exam_token;
            $scope.placementTestId = responseData.placement_test_log_id;
          } else {
            $scope.question = responseData;
            if ($scope.question.finish_exam_bonus_exp === 0 &&
              $scope.question.num_affected_skill.length === 0) {

              Sound.playFailSound();
              $scope.questionTpl = 'questionFailure';
              $scope.footerTpl = 'footerFailure';
            } else {
              Sound.playFinishSound();
              $scope.questionTpl = 'questionSuccess';
              $scope.footerTpl = 'footerSuccess';
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
              $scope.result = {};
            }
          }
        });
    };

    PlacementTest.start()
      .then(function () {
        $scope.question = PlacementTest.question.question;
        $scope.exam_token = PlacementTest.question.exam_token;
        $scope.num_questions = PlacementTest.question.current_question;
        $scope.total_num_questions = PlacementTest.question.total_num_questions;
        $scope.question.userAnswer = "";
        $scope.questionTpl = questionTplId[$scope.question.type];
        $scope.placementTestId = PlacementTest.question.placement_test_log_id;
      });

    $scope.keyUpHandler = function (e) {
      if (e.keyCode === 8) {
        return false;
      }

      if (e.keyCode === 13) {
        if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
          if ($scope.questionState && $scope.questionState === 'answered') {
            // $scope.check();
            $scope.nextQuestion();
          } else {
            $scope.check();
          }
        }
      }
    };

    $scope.discussion = function () {
      var modalInstance = $modal.open({
        templateUrl: 'forum/_discussion-placement-test.html',
        windowClass: 'discussion-popup-modal',
        controller: 'DiscussionPlacementTestModalCtrl'
      });
    }
  }

  function DiscussionPlacementTestModalCtrl ($scope, $location, PlacementTest, $localStorage, ForumServices) {
    $scope.question = PlacementTest.question.question;
    console.log(PlacementTest.question.question)
    $scope.requestData = {
      content: ''
    }

    $scope.data = {};
    $scope.data.question_log_id = $scope.question.question_log_id;
    $scope.data.base_course_id = $localStorage.auth.user.current_course_id;

    if ($scope.question.type == 'judge' ) {
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
          console.log(data);
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

  angular.module('placement.controllers', [])
    .controller('PlacementTestCtrl', [
      '$scope', '$location', 'PlacementTestFactory', 'Question', 'Sound', '$modal', '$localStorage', PlacementTestCtrl
    ])
    .controller('DiscussionPlacementTestModalCtrl', ['$scope', '$location', 'PlacementTestFactory', '$localStorage', 'ForumServices',
      DiscussionPlacementTestModalCtrl
    ]);

}(window.angular));