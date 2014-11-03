'use strict';

angular.module('exam.services', [])
    .factory('Exam', ['ExamServices', 'Question', function(ExamServices, Question) {
	var exam, questions, answered, wrongAnswers, question, questionPosition,
	    hearts, availableItems, examToken, test = 1;

	function start(data) {
	    return ExamServices.start(data).then(function(response) {
		init(response.data);
	    });
	}

	function init(data) {
	   //  questions = data.questions.filter(function(q) {return q.type === 'translate';});
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
	}

	function next() {
	    questionPosition += 1;
	    question = questions[questionPosition];
	}

	function skip() {
	    hearts.remaining = hearts.remaining - 1;
	    hearts.lost += 1;
	    answered += 1;
	}

	function finish(data) {
	    return ExamServices.finish(data).then(function(response) {
	    });
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
	    test: test
	};
    }])
    .factory('ExamServices', [
	'$http', '$q', '$localStorage',
	function($http, $q, $localStorage) {
	    var HOST = 'http://api.memo.edu.vn/api',
		API_VERSION = '/v1.3',
		BASE_URL = HOST + API_VERSION;

	    var user = $localStorage.auth.user;

	    function start(data) {
		var deferred = $q.defer();

		var requestData = {
		    type: 'lesson',
		    auth_token: user.auth_token,
		    lesson_number: data.lesson_number,
		    skill_id: data.skill_id,
		    device: 'web'
		};

		$http.post(BASE_URL + '/exam/start', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }

	    function finish(data) {
		var deferred = $q.defer();



		return deferred.promise;
	    }

	    return {
		start: start,
		finish: finish
	    };
	}]);
