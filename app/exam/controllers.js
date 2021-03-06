(function (angular) {
  'use strict';

  function ExamCtrl($scope, $timeout, $routeParams, $sce, $location, Exam, Question, Sound, MemoTracker,
    Skill, $modal, $localStorage, ForumServices, Profile, AppSetting, $rootScope, $translate, $interval, roundProgressService) {
    var examType = $location.path().split('/')[1].trim();
    var skill = Skill.skill($routeParams.id);




    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    });

    $translate.use($localStorage.auth.user.display_lang);

    $scope.sharedSettings = {
      functionaly: {
        should_forum: true
      }
    };

    $scope.$on('event-sharedSettingsLoaded', function () {
      $scope.sharedSettings = AppSetting.sharedSettings;
    });
    
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
      success: 'questionSuccess',
      lastScreen: 'questionLastScreen'
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
      if (Exam.question().last_screen && Exam.question().last_screen.is_enabled && AppSetting.sharedSettings.functionaly.should_last_screen) {
        $scope.questionTpl = questionTplId.lastScreen;
        $scope.lastScreenText = Question.createLastScreenText(Exam.question().last_screen);
      } else {
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
      }
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
          $scope.openScholarshipPopup();
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
            if (Exam.question().max_skill) {
              $scope.openMaxCoursePopup();
            }
          });
          Sound.playFinishSound();
          // $scope.openScholarshipPopup();
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

        if (Profile.getUser().current_course_id == "en-th" && ($scope.question.type == "translate" || $scope.question
            .type == "name")) {
          Question.asyncCheck($scope.question).success(function (data) {
            var result = data;
            result.answerOptions = data.type === 3 ? Question.createHTMLForTypo(data) : false;
            $scope.result = result;
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
          });
        } else {
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
        };
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
          $scope.current+= 1;
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
        $scope.max =$scope.questions.length
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

    $scope.openPopupScholarshipInLastScreen = function (data) {
      var modalInstance = $modal.open({
        templateUrl: 'exam/_scholarship-popup-modal.html',
        windowClass: 'scholarship-popup-modal',
        resolve: {
          url: function () {
            return data.last_screen.button_url;
          }
        },
        controller: 'ScholarshipPopupModalCtrl'
      });
    };

    $scope.openScholarshipPopup = function () {
      ExamServices.getUrlScholarshipPopup().success(function (data) {
        $scope.scholarshipPopupUrl = data.popup_url;
        ExamServices.openScholarshipPopup().success(function (data) {
          var modalInstance = $modal.open({
            templateUrl: 'exam/_scholarship-popup-modal.html',
            windowClass: 'scholarship-popup-modal',
            resolve: {
              url: function () {
                return $scope.scholarshipPopupUrl;
              }
            },
            controller: 'ScholarshipPopupModalCtrl'
          });
        })
      });
    };

    $scope.openMaxCoursePopup = function () {
      var modalInstance = $modal.open({
        templateUrl: 'exam/_max-course-popup-modal.html',
        windowClass: 'max-course-popup-modal',
        controller: 'MaxCoursePopupModalCtrl'
      });
    };

    $scope.current=         0;
    $scope.max =            0;
    $scope.timerCurrent =   0;
    $scope.uploadCurrent =  0;
    $scope.stroke =         10;
    $scope.radius =         50;
    $scope.isSemi =         false;
    $scope.rounded =        false;
    $scope.responsive =     false;
    $scope.clockwise =      true;
    $scope.currentColor =   '#ffbb33';
    $scope.bgColor =        '#999999';
    $scope.duration =       800;
    $scope.currentAnimation = 'easeOutCubic';

    $scope.increment = function(){

      $scope.current+= 10;
      console.log(amount)
    };

    $scope.decrement = function(amount){
      $scope.current-=(amount || 1);
    };

    $scope.animations = [];

    angular.forEach(roundProgressService.animations, function(value, key){
      $scope.animations.push(key);
    });

    $scope.getStyle = function(){
      return {
        'top': $scope.isSemi ? 'auto' : '50%',
        'bottom': $scope.isSemi ? '5%' : 'auto',
        'left': '50%',
        'transform': ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)',
        'font-size': $scope.radius/3.5 + 'px'
      };
    };

    $scope.getColor = function(){
      return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
    };

    var getPadded = function(val){
      return val < 10 ? ('0' + val) : val;
    };
  }

  function DiscussionExamModalCtrl($scope, $location, Exam, ExamStrengthen, $localStorage, ForumServices,
    $modalInstance, AppSetting, $rootScope, $translate) {
    $scope.question = Exam.question() || ExamStrengthen.question();
    $scope.requestData = {
      content: ''
    }

    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    })

    $translate.use($localStorage.auth.user.display_lang);

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

  function ScholarshipPopupModalCtrl($scope, url, $sce) {
    $scope.test = $sce.trustAsResourceUrl(url);
  }

  function MaxCoursePopupModalCtrl($scope, $modalInstance, AppSetting) {
    $scope.shareMaxSkill = function () {
      AppSetting.getMaxSkillFacebookContent().then(function (response) {
        var data = response.data;
        data.method = 'feed';

        FB.ui(data, function (response) {});
      });
    };

    $scope.close = function () {
      $modalInstance.close();
    };
  }


  angular.module('exam.controllers', ['ngSanitize', 'angular-svg-round-progress'])
    .controller('ExamCtrl', [
      '$scope', '$timeout', '$routeParams', '$sce', '$location', 'Exam', 'Question', 'Sound',
      'MemoTracking', 'Skill', '$modal', '$localStorage', 'ForumServices', 'Profile', 'AppSetting', '$rootScope', '$translate', '$interval', 'roundProgressService', ExamCtrl
    ])
    .controller('DiscussionExamModalCtrl', ['$scope', '$location', 'Exam', 'ExamStrengthen', '$localStorage',
      'ForumServices', '$modalInstance', 'AppSetting', '$rootScope', '$translate', DiscussionExamModalCtrl
    ])
      //.controller('demoCtrl', ['$scope', '$interval', 'roundProgressService', demoCtrl])
    .controller('ScholarshipPopupModalCtrl', ['$scope', 'url', '$sce', ScholarshipPopupModalCtrl])
    .controller('MaxCoursePopupModalCtrl', ['$scope', '$modalInstance', 'AppSetting', MaxCoursePopupModalCtrl]);
}(window.angular));