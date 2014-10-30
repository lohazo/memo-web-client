'use strict';

angular.module('exam.services', [])
    .factory('Exam', ['ExamServices', 'Question', function(ExamServices, Question) {
	var questions;
	function start(data) {
	    return ExamServices.start(data).then(function(response) {
		questions = response.data;
	    });
	}

	function getQuestions() {
	    return questions;
	}

	function getCurrentQuestion() {
	}

	function getNextQuestion() {
	}

	function skip() {
	}

	function finish() {
	}

	return {
	    start: start,
	    skip: skip,
	    finish: finish,
	    currentQuestion: getCurrentQuestion,
	    nextQuestion: getNextQuestion
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
		    skill_id: data.skill_id
		};

		$http.post(BASE_URL + '/exam/start', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }

	    return {
		start: start
	    };
	}]);
