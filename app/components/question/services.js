'use strict';

angular.module('question.services', [])
    .factory('Question', [function() {
	var Question = function() {};

	Question.prototype.check = function(question, userAnswer) {
	    if (question.type === 'listen') {
		return checkListen(question, userAnswer);
	    }

	    if (question.type === 'translate') {
		return checkTranslate(question, userAnswer);
	    }

	    if (question.type === 'select') {
		return checkSelect(question, userAnswer);
	    }

	    if (question.type === 'judge') {
		return checkJudge(question, userAnswer);
	    }
	    // {
	    //	result: false,
	    //	correctAnswer:
	    //  answerOption: [ result form diff]
	    // };
	    return false;
	};

	Question.prototype.skip = function(question, userAnswer) {
	    var result = {};

	    if (question.type === 'listen') {
		result = checkListen(question, userAnswer);
	    } else if (question.type === 'translate') {
		result = checkTranslate(question, userAnswer);
	    } else if (question.type === 'select') {
		result = checkSelect(question, userAnswer);
	    } else if (question.type === 'judge') {
		result = checkJudge(question, userAnswer);
	    }

	    result.result = false;

	    return result;
	};

	function checkListen(question, userAnswer) {
	    var result = {
		result: false,
		userAnswer: userAnswer,
		correctAnswer: question.question,
		answerOptions: []
	    };

	    if (userAnswer === question.question) {
		result.result = true;
	    }

	    return result;
	}

	function checkTranslate(question, userAnswer) {
	    var result = {
		result: false,
		userAnswer: userAnswer,
		correctAnswer: question.translation
	    };

	    var translations = question.compact_translations.splice(0);
	    translations.push(question.translation);
	    result.result = translations.some(function(obj) {
		return userAnswer === obj[0];
	    });

	    return result;
	}

	function checkSelect(question, userAnswer) {

	}

	function checkJudge(question, userAnswer) {
	    var result = {
		result: false,
		correctAnswer: question.question.hints[0],
		answerOptions: []
	    };
	    
	    if (userAnswer.length === question.question.hints.length
		      && userAnswer[0] === question.question.hints[0]) {
		result.result = true;
	    }
	    return result;
	}

	return new Question();
    }]);
