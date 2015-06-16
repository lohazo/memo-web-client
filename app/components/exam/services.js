(function (angular) {

  'use strict';

  function ExamFactory($localStorage, $window, ExamServices, Feedback, PlazaServices,
    MemoTracker) {
    var exam, questions, answered, wrongAnswers, question, questionPosition,
      hearts, availableItems, examToken, answersLog, usedItems;

    function start(data) {
      return ExamServices.start(data)
        .then(function (response) {
          init(response.data);
        }, function (response) {
          if (response.status == 422) {
            $window.location = "/";
          }
        });
    }

    function init(data) {
      // questions = data.questions.filter(function(q) {return q.type === 'judge';});
      questions = data.questions;
      hearts = {
        remaining: data.max_hearts_count,
        lost: 0
      };
      availableItems = data.available_items;
      examToken = data.exam_token;
      answered = 0;
      questionPosition = 0;
      question = questions[questionPosition];
      answersLog = {};
      usedItems = [];
      Feedback.list = [];

      MemoTracker.track('start exam lesson')
    }

    function getQuestions() {
      return questions;
    }

    function getQuestion() {
      return question;
    }

    function getQuestionPosition() {
      return questionPosition;
    }

    function getWrongAnswers() {
      return wrongAnswers;
    }

    function getAnswered() {
      return answered;
    }

    function getHearts() {
      return hearts;
    }

    function getIsAutoFeedback() {
      if ($localStorage.appSharedSettings.feedback_types.auto_feedback_types.indexOf(question
          .type) >= 0) {
        return true;
      }

      return false;
    }

    function getAvailableItems() {
      return availableItems;
    }

    function check(isCorrect) {
      answered += 1;
      var log = {};
      log[question.question_log_id] = true;
      answersLog[question.question_log_id] = true;
    }

    function next() {
      questionPosition += 1;
      question = questions[questionPosition];
    }

    function skip() {
      hearts.remaining = hearts.remaining - 1;
      hearts.lost += 1;
      answered += 1;

      var log = {};
      log[question.question_log_id] = false;
      answersLog[question.question_log_id] = false;
    }

    function logFeedback(data) {
      // data = {question_log_id, user_input, is_auto=true}
      Feedback.list.push(data);
    }

    function sendFeedbackLogs() {
      Feedback.create();
    }

    function useItem(item) {
      var requestData = {
        'base_item_id': item
      };

      if (item === 'health_potion') {
        if (hearts.lost > 0) {
          hearts.lost = hearts.lost - 1;
          hearts.remaining = hearts.remaining + 1;
          PlazaServices.use(requestData)
            .then(function (response) {
              delete availableItems[0];
              usedItems.push(item);
            });
        }
      }
    }

    function checkState() {
      if (hearts.remaining < 0) {
        MemoTracker.track('fail exam lesson')
        return {
          isFinished: true,
          isFail: true
        };
      }

      if (answered === questions.length) return {
        isFinished: true,
        isFail: false
      };

      return {
        isFinished: false,
        isFail: false
      };
    }

    function finish(data) {
      MemoTracker.track('finish exam lesson')
      data.examToken = examToken;
      data.logs = JSON.stringify(answersLog);
      data.base_item_id = usedItems.length > 0 ? usedItems[0] : '';
      return ExamServices.finish(data).then(function (response) {
        question = response.data;
        
      });
    }

    function fail(data) {
      data.examToken = examToken;
      data.logs = JSON.stringify(answersLog);
      return ExamServices.fail(data);
    }

    return {
      start: start,
      skip: skip,
      finish: finish,
      fail: fail,
      next: next,
      check: check,
      answered: getAnswered,
      wrongAnswers: getWrongAnswers,
      questions: getQuestions,
      question: getQuestion,
      questionPosition: getQuestionPosition,
      hearts: getHearts,
      checkState: checkState,
      logFeedback: logFeedback,
      sendFeedbackLogs: sendFeedbackLogs,
      isAutoFeedback: getIsAutoFeedback,
      availableItems: getAvailableItems,
      useItem: useItem
    };
  }

  function ExamStrengthen($localStorage, $window, ExamServices, Feedback, PlazaServices,
    MemoTracker) {
    var exam, questions, answered, wrongAnswers, question, questionPosition,
      hearts, availableItems, examToken, answersLog, usedItems;

    function start(data) {
      return ExamServices.start(data)
        .then(function (response) {
          init(response.data);
        }, function (response) {
          if (response.status == 422) {
            $window.location = "/";
          }
        });
    }

    function init(data) {
      // questions = data.questions.filter(function(q) {return q.type === 'translate';});
      questions = data.questions;
      hearts = {
        remaining: data.max_hearts_count,
        lost: 0
      };
      availableItems = data.available_items;
      examToken = data.exam_token;
      answered = 0;
      questionPosition = 0;
      question = questions[questionPosition];
      answersLog = {};
      usedItems = [];
      Feedback.list = [];

      MemoTracker.track('start exam lesson')
    }

    function getQuestions() {
      return questions;
    }

    function getQuestion() {
      return question;
    }

    function getQuestionPosition() {
      return questionPosition;
    }

    function getWrongAnswers() {
      return wrongAnswers;
    }

    function getAnswered() {
      return answered;
    }

    function getHearts() {
      return hearts;
    }

    function getIsAutoFeedback() {
      if ($localStorage.appSharedSettings.feedback_types.auto_feedback_types.indexOf(question
          .type) >= 0) {
        return true;
      }

      return false;
    }

    function getAvailableItems() {
      return availableItems;
    }

    function check(result, objectives) {
      answered += 1;
      var log = {};
      log[question.question_log_id] = true;
      answersLog[question.question_log_id] = {
        result: result.result,
        result_type: result.type,
        objectives: objectives
      };
    }

    function next() {
      questionPosition += 1;
      question = questions[questionPosition];
    }

    function skip(result, objectives) {
      hearts.remaining = hearts.remaining - 1;
      hearts.lost += 1;
      answered += 1;

      var log = {};
      log[question.question_log_id] = false;
      answersLog[question.question_log_id] = {
        result: false,
        result_type: -1,
        objectives: objectives
      };
    }

    function logFeedback(data) {
      // data = {question_log_id, user_input, is_auto=true}
      Feedback.list.push(data);
    }

    function sendFeedbackLogs() {
      Feedback.create();
    }

    function useItem(item) {
      var requestData = {
        'base_item_id': item
      };

      if (item === 'health_potion') {
        if (hearts.lost > 0) {
          hearts.lost = hearts.lost - 1;
          hearts.remaining = hearts.remaining + 1;
          PlazaServices.use(requestData)
            .then(function (response) {
              delete availableItems[0];
              usedItems.push(item);
            });
        }
      }
    }

    function checkState() {
      if (hearts.remaining < 0) {
        MemoTracker.track('fail exam lesson')
        return {
          isFinished: true,
          isFail: true
        };
      }

      if (answered === questions.length) return {
        isFinished: true,
        isFail: false
      };

      return {
        isFinished: false,
        isFail: false
      };
    }

    function finish(data) {
      MemoTracker.track('finish exam lesson')
      data.examToken = examToken;
      data.logs = JSON.stringify(answersLog);
      data.base_item_id = usedItems.length > 0 ? usedItems[0] : '';
      return ExamServices.finish(data).then(function (response) {
        question = response.data;
      });
    }

    function fail(data) {
      data.examToken = examToken;
      data.logs = JSON.stringify(answersLog);
      return ExamServices.fail(data);
    }

    return {
      start: start,
      skip: skip,
      finish: finish,
      fail: fail,
      next: next,
      check: check,
      answered: getAnswered,
      wrongAnswers: getWrongAnswers,
      questions: getQuestions,
      question: getQuestion,
      questionPosition: getQuestionPosition,
      hearts: getHearts,
      checkState: checkState,
      logFeedback: logFeedback,
      sendFeedbackLogs: sendFeedbackLogs,
      isAutoFeedback: getIsAutoFeedback,
      availableItems: getAvailableItems,
      useItem: useItem
    };
  }

  function ExamServices($http, $q, $localStorage, API, $location) {
    var Services = {};
    var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

    function transformRequest(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }

    Services.start = function (data) {
      var deferred = $q.defer();
      var auth_token = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        platform: 'web'
      };

      if (data.type === "lesson") {
        requestData.lesson_number = data.lesson_number;
        requestData.skill_id = data.skill_id;
      } else if (data.type === "checkpoint") {
        requestData.checkpoint_position = data.checkpoint_position;
      } else if (data.type === 'shortcut' || data.type === "strengthen_skill") {
        requestData.skill_id = data.skill_id;
      }

      $http.post(API + '/exams/start?platform=web&localize=' + localize, requestData)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      // $http.get('/assets/data/exam_1.json').then(function(response) {
      //     deferred.resolve(response);
      // });

      return deferred.promise;
    };

    Services.finish = function (data) {
      var deferred = $q.defer();
      var auth_token = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        exam_token: data.examToken,
        platform: 'web',
        answers: data.logs,
        base_item_id: data.base_item_id
      };

      if (data.type === "lesson") {
        requestData.lesson_number = data.lesson_number;
        requestData.skill_id = data.skill_id;
      } else if (data.type === "checkpoint") {
        requestData.checkpoint_position = data.checkpoint_position;
      } else if (data.type === 'shortcut' || data.type === 'strengthen_skill') {
        requestData.skill_id = data.skill_id;
      }

      $http.post(API + '/exams/finish?platform=web&localize=' + localize, requestData)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;

    };

    Services.fail = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      var requestData = {
        type: data.type,
        auth_token: auth_token,
        platform: 'web'
      };

      if (data.type === "checkpoint") {
        requestData.checkpoint_position = data.checkpoint_position;
      }

      $http.post(API + '/exams/fail?platform=web&localize=' + localize, data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    Services.getUrlScholarshipPopup = function () {
      var authToken = $localStorage.auth.user.auth_token;

      var endpoint = API + '/popup/?platform=web&localize=' + localize + '&auth_token=' + authToken;

      return $http.get(endpoint);
    }

    Services.openScholarshipPopup = function () {
      var authToken = $localStorage.auth.user.auth_token;

      var endpoint = API + '/popup/open/?platform=web&localize=' + localize + '&auth_token=' + authToken;

      return $http.get(endpoint);
    }

    return Services;
  }

  angular.module('exam.services', []);
  angular.module('exam.services')
    .factory('Exam', ['$localStorage', '$window',
      'ExamServices', 'Feedback', 'PlazaServices', 'MemoTracking', ExamFactory
    ])
    .factory('ExamStrengthen', ['$localStorage', '$window',
      'ExamServices', 'Feedback', 'PlazaServices', 'MemoTracking', ExamStrengthen
    ])
    .factory('ExamServices', ['$http', '$q', '$localStorage', 'API', '$location', ExamServices]);
}(window.angular));