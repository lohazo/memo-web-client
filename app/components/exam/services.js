'use strict';

angular.module('exam.services', [])
    .factory('Exam', [
	'ExamServices', 'Feedback', '$localStorage', '$location',
	function(ExamServices, Feedback, $localStorage, $location) {
	    var exam, questions, answered, wrongAnswers, question, questionPosition,
		hearts, availableItems, examToken, answersLog;

	    function start(data) {
		return ExamServices.start(data)
		    .then(function(response) {
			init(response.data);
		    }, function(response) {
			if (response.status == 422) {
			    $location.path('/');
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
		availableItems = data.available_item;
		examToken = data.exam_token;
		answered = 0;
		questionPosition = 0;
		question = questions[questionPosition];
		answersLog = {};
		Feedback.list = [];
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
		if ($localStorage.appSetting.auto_feedback_types.indexOf(question.type) >= 0) {
		    return true;
		}

		return false;
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

	    function checkState() {
		if (hearts.remaining < 0) return {isFinished: true, isFail: true};
		if (answered === questions.length) return {isFinished: true, isFail: false};
		return {isFinished: false, isFail: false};
	    }

	    function finish(data) {
		data.examToken = examToken;
		data.logs = JSON.stringify(answersLog);
		return ExamServices.finish(data);
	    }

	    return {
		start: start,
		skip: skip,
		finish: finish,
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
		isAutoFeedback: getIsAutoFeedback
	    };
	}])
    .factory('ExamServices', [
	'$http', '$q', '$localStorage',
	function($http, $q, $localStorage) {
	    var HOST = 'http://api.memo.edu.vn/api',
		API_VERSION = '/v1.4',
		BASE_URL = HOST + API_VERSION;

	    function start(data) {
		var deferred = $q.defer();
		var auth_token = $localStorage.auth.user.auth_token;

		var requestData = {
		    type: data.type,
		    auth_token: auth_token,
		    device: 'web'
		};

		if (data.type === "lesson") {
		    requestData.lesson_number = data.lesson_number;
		    requestData.skill_id = data.skill_id;
		} else if (data.type === "checkpoint") {
		    requestData.checkpoint_position = data.checkpoint_position;
		} else if (data.type === 'shortcut') {
		    requestData.skill_id = data.skill_id;
		}

		$http.post(BASE_URL + '/exam/start', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    }, function(response) {
			deferred.reject(response);
		    });

		// $http.get('/assets/data/exam_1.json').then(function(response) {
		//     deferred.resolve(response);
		// });

		return deferred.promise;
	    }

	    function finish(data) {
		var deferred = $q.defer();
		var auth_token = $localStorage.auth.user.auth_token;

		var requestData = {
		    type: data.type,
		    auth_token: auth_token,
		    exam_token: data.examToken,
		    device: 'web',
		    answers: data.logs
		};

		if (data.type === "lesson") {
		    requestData.lesson_number = data.lesson_number;
		    requestData.skill_id = data.skill_id;
		} else if (data.type === "checkpoint") {
		    requestData.checkpoint_position = data.checkpoint_position;
		} else if (data.type === 'shortcut') {
		    requestData.skill_id = data.skill_id;
		}

		$http.post(BASE_URL + '/exam/finish', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }

	    return {
		start: start,
		finish: finish
	    };
	}
    ]);
