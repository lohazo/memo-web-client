'use strict';

angular.module('exam.services', [])
    .factory('Exam', ['ExamServices', 'Feedback', function(ExamServices, Feedback) {
	var exam, questions, answered, wrongAnswers, question, questionPosition,
	    hearts, availableItems, examToken, logs;

	function start(data) {
	    return ExamServices.start(data).then(function(response) {
		init(response.data);
	    });
	}

	function init(data) {
	    questions = data.questions.filter(function(q) {return q.type === 'translate';});
	    // questions = data.questions;
	    hearts = {
		remaining: data.max_hearts_count,
		lost: 0
	    };
	    availableItems = data.available_item;
	    examToken = data.exam_token;
	    answered = 0;
	    questionPosition = 0;
	    question = questions[questionPosition];
	    logs = [];
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

	function check(isCorrect) {
	    answered += 1;

	    log({
		question_log_id: question.question_log_id,
		result: true
	    });
	}

	function next() {
	    questionPosition += 1;
	    question = questions[questionPosition];
	}

	function skip() {
	    hearts.remaining = hearts.remaining - 1;
	    hearts.lost += 1;
	    answered += 1;

	    log({
		question_log_id: question.question_log_id,
		result: false
	    });
	}

	function log(data) {
	    // data = {question_log_id, result};
	    logs.push(data);
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
	    data.logs = JSON.stringify(logs);
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
	    sendFeedbackLogs: sendFeedbackLogs
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
		    lesson_number: data.lesson_number,
		    skill_id: data.skill_id,
		    device: 'web'
		};

		$http.get('/assets/data/exam_1.json', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }

	    function finish(data) {
		var deferred = $q.defer();
		var auth_token = $localStorage.auth.user.auth_token;

		var requestData = {
		    type: data.type,
		    auth_token: auth_token,
		    lesson_number: data.lesson_number,
		    skill_id: data.skill_id,
		    device: 'web',
		    answers: data.logs,
		    exam_token: data.examToken
		};

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
