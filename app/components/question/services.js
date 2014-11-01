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

	    if (question.type === 'name') {
		return checkName(question, userAnswer);
	    }

	    if (question.type === 'form') {
		return checkForm(question, userAnswer);
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
	    } else if (question.type === 'name') {
		result = checkName(question, userAnswer);
	    } else if (question.type === 'form'){
		result = checkForm(question, userAnswer);
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
	    var result = {
		result: false,
		userAnswer: userAnswer,
		correctAnswer: question.translation
	    };

	    return result;
	}

	function checkJudge(question, userAnswer) {
	    var result = {
		result: false,
		correctAnswer: question.hints[0],
		answerOptions: []
	    };

	    if (userAnswer.length === question.hints.length
		      && userAnswer[0] === question.hints[0]) {
		result.result = true;
	    }
	    return result;
	}

	function checkName(question, userAnswer) {
	    var result = {
		result: false,
		userAnswer: userAnswer,
		correctAnswer: question.hint
	    };

	    if (userAnswer === question.hint) {
		result.result = true;
	    }

	    return result;
	}

	function checkForm(question, userAnswer) {
	    var result = {
		result: false,
		userAnswer: userAnswer,
		correctAnswer: question.hint
	    };

	    var tokens = angular.fromJson(angular.toJson(question.tokens));
	    var options = tokens.filter(function(token) {
		return (token instanceof Array);
	    })[0];
	    var index = tokens.indexOf(options);
	    tokens[index] = userAnswer;
	    if (tokens.join(' ') === question.hint) {
		result.result = true;
	    }

	    return result;
	}

	return new Question();
    }]);
