'use strict';

angular.module('exam.controllers', ['ngSanitize'])
    .controller('ExamCtrl', [
	'$scope', '$timeout', '$routeParams', '$location', 'Exam', 'Question',
	'Sound',
	function($scope, $timeout, $routeParams, $location, Exam, Question, Sound) {
	    var examType = $location.path().split('/')[1].trim();

	    var requestData = {
		type: examType === 'skill' ? 'lesson' : examType
	    };

	    if (examType === 'skill') {
		requestData.lesson_number = $routeParams.lesson_number;
		requestData.skill_id = $routeParams.id;
	    } else if (examType === 'checkpoint') {
		requestData.checkpoint_position = $routeParams.checkpoint_position;
	    } else if (examType === 'shortcut') {
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

	    $scope.useItem = function(item) {
		Exam.useItem(item);
		$scope.availableItems = Exam.availableItems();
	    };

	    $scope.quit = function(afterDoingTest) {
		// Call Feedback API
		if (afterDoingTest) {
		    Exam.sendFeedbackLogs();
		}
		delete $scope.exam;
		$location.path('/');
	    };

	    $scope.finish = function() {
		Exam.finish(requestData).then(function(response) {
		    $scope.quit(true);
		});
	    };

	    $scope.checkState = function() {
		if (Exam.checkState().isFinished) {
		    if (Exam.checkState().isFail) {
			$scope.questionTpl = questionTplId.failure;
			$scope.footerTpl = "footerFailure";
			Sound.playFailSound();
		    } else {
			// Call finish API
			Exam.finish(requestData).then(function() {
			    $scope.questionTpl = questionTplId.success;
			    $scope.footerTpl = "footerSuccess";
			    $scope.question = Exam.question();
			    $scope.expChart = {
				    labels: $scope.question.exp_chart.days,
				    datasets: [{
					label: "",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "#848484",
					pointColor : "#810c15",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : $scope.question.exp_chart.exp
				    }]
				};
			});
			Sound.playFinishSound();
		    }
		    return true;
		}
		return false;
	    };

	    $scope.autoFeedback = function() {
		Exam.logFeedback({
		    question_log_id: $scope.question.question_log_id,
		    user_answer: $scope.question.userAnswer || '',
		    user_note: '',
		    feedback_type_ids: [],
		    auto_feedback: true
		});
	    };

	    $scope.userFeedback = function(userNote, feedbackTypeIds) {
		$scope.isAutoFeedback = false;
		Exam.logFeedback({
		    question_log_id: $scope.question.question_log_id,
		    user_answer: $scope.question.userAnswer || '',
		    user_note: userNote,
		    feedback_type_ids: feedbackTypeIds,
		    auto_feedback: false
		});
	    };

	    $scope.skip = function() {
		$scope.result = Question.skip($scope.question, '');

		Exam.skip();
		Sound.playHeartLostSound();

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
			Sound.playHeartLostSound();
			$scope.hearts = Exam.hearts();
			$scope.checkState();
		    } else {
			Exam.check();
			Sound.playCorrectSound();
		    }
		    $scope.answered = Exam.answered();
		}
	    };

	    $scope.nextQuestion = function() {
		if ($scope.isAutoFeedback) {
		    $scope.autoFeedback();
		}

		if (!$scope.checkState()) {
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
			$scope.isAutoFeedback = Exam.isAutoFeedback();
		    }, 1);
		}
	    };

	    Exam.start(requestData).then(function(response) {
		$scope.questions = Exam.questions();
		$scope.question = Exam.question();
		$scope.answered = Exam.answered();
		$scope.ant = 0;
		$scope.hearts = Exam.hearts();
		$scope.question.userAnswer = "";
		$scope.questionTpl = questionTplId[$scope.question.type];
		$scope.isAutoFeedback = Exam.isAutoFeedback();
		$scope.availableItems = Exam.availableItems();
	    });

	    $scope.keyUpHandler = function(e) {
		
	    };
	}
    ]);
