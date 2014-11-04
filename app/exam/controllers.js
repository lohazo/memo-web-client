'use strict';

angular.module('exam.controllers', [])
    .controller('ExamCtrl', [
	'$scope', '$timeout', '$routeParams', '$location', 'Exam', 'Question',
	function($scope, $timeout, $routeParams, $location, Exam, Question) {
	    var requestData = {
		skill_id: $routeParams.id,
		lesson_number: $routeParams.lesson_number,
		type: 'lesson'
	    };

	    $scope.questionTpl = '';
	    $scope.footerTpl = 'footer';

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

	    $scope.question = { };
	    $scope.result = { };
	    $scope.hearts = {
		remaining: 0,
		lost: 0
	    };
	    $scope.userAnswer = '';

	    $scope.quit = function() {
		// Call Feedback API
		delete $scope.exam;
		$location.path('/');
	    };

	    $scope.finish = function() {
		Exam.finish(requestData).then(function(response) {
		    $scope.quit();
		});
	    };

	    $scope.checkState = function() {
		if (Exam.checkState().isFinished) {
		    if (Exam.checkState().isFail) {
			$scope.questionTpl = questionTplId.failure;
			$scope.footerTpl = "footerFailure";

			// Call feedback API
			Exam.sendFeedbackLogs();
		    } else {
			// Call finish API
			Exam.finish(requestData).then(function(response) {
			    $scope.questionTpl = questionTplId.success;
			    $scope.footerTpl = "footerSuccess";
			}).then(function() {
			    Exam.sendFeedbackLogs();
			});
		    }
		}
	    };

	    $scope.skip = function() {
		$scope.result = Question.skip($scope.question, '');

		Exam.skip();
		Exam.logFeedback({
		    question_log_id: $scope.question.question_log_id,
		    user_input: '',
		    is_auto: true
		});

		$scope.hearts = Exam.hearts();
		$scope.footerTpl = "footerResult";

		$scope.checkState();
	    };

	    $scope.check = function() {
		if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
		    $scope.result = Question.check($scope.question, $scope.question.userAnswer);
		    $scope.footerTpl = "footerResult";

		    if (!$scope.result.result) {
			Exam.skip();
			Exam.logFeedback({
			    question_log_id: $scope.question.question_log_id,
			    user_input: $scope.question.userAnswer,
			    is_auto: true
			});

			$scope.hearts = Exam.hearts();
		    } else {
			Exam.check();
		    }
		    $scope.answered = Exam.answered();

		    $scope.checkState();
		}
	    };

	    $scope.nextQuestion = function() {
		$scope.questionTpl = "";
		$scope.footerTpl = "footer";

		// Aggressively update
		$timeout(function() {
		    Exam.next();
		    $scope.question = Exam.question();
		    $scope.answered = Exam.answered();
		    $scope.ant = Exam.questionPosition();
		    $scope.question.userAnswer = "";
		    $scope.questionTpl = questionTplId[$scope.question.type];
		}, 1);
	    };

	    Exam.start(requestData).then(function(response) {
		$scope.questions = Exam.questions();
		$scope.question = Exam.question();
		$scope.answered = Exam.answered();
		$scope.ant = 0;
		$scope.hearts = Exam.hearts();
		$scope.question.userAnswer = "";
		$scope.questionTpl = questionTplId[$scope.question.type];
	    });
	}
    ]);
