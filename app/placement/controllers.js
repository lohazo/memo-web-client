'use strict';

angular.module('placement.controllers', [])
    .controller('PlacementCtrl', [
	'$scope', '$rootScope', '$location', '$localStorage', 'AuthService',
	'Placement', 'Question',
	function($scope, $rootScope, $location, $localStorage, AuthService, PlacementTest, Question) {
	    $scope.auth = $localStorage.auth || {
		loggedIn: false,
		trial: false
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
		translate: 'questionTranslate'
	    };

	    var footerTplId = {
		footer: 'footer',
		failure: 'footerFailure',
		result: 'footerResult'
	    };

	    $rootScope.$on('event:auth-invalidToken', function(e, data) {
		AuthService.logout();
	    });
	    $rootScope.$on('event:auth-loginConfirmed', function(e, data) {
		$scope.auth = {
		    loggedIn: true,
		    user: data.user,
		    trial: data.is_trial
		};
		$localStorage.auth = $scope.auth;
	    });

	    $rootScope.$on('event:auth-logoutConfirmed', function(e, data) {
		$scope.auth = { loggedIn: false, trial: false };
		$localStorage.$reset();
		$localStorage.auth = $scope.auth;
		$location.path('/');
	    });

	    $scope.question = { };
	    $scope.result = { };
	    $scope.userAnswer = '';
	    $scope.quit = function() {
		delete $scope.exam;
		$location.path('/');
	    };

	    $scope.skip = function() {
		$scope.result = Question.skip($scope.question.question, '');
		$scope.footerTpl = "footerResult";
	    };

	    $scope.check = function() {
		if ($scope.question.userAnswer && $scope.question.userAnswer.length > 0) {
		    $scope.result = Question.check($scope.question.question, $scope.question.userAnswer);
		    $scope.footerTpl = "footerResult";
		}
	    };

	    $scope.nextQuestion = function() {

		var requestData = {
		    auth_token: $scope.auth.user.auth_token,
		    exam_token: $scope.question.exam_token
		};

		var tmp = {};
		tmp[$scope.question.question.question_log_id] = $scope.result.result;
		requestData.answer = angular.toJson(tmp);

		PlacementTest.submitAnswer(requestData)
		    .then(function() {
			$scope.footerTpl = "footer";
			$scope.result = { };
			$scope.question = PlacementTest.getCurrentQuestion();
			$scope.question.userAnswer = "";
			$scope.questionTpl = "";
			$scope.questionTpl = questionTplId[$scope.question.question.type];
		    });
	    };

	    if ($scope.auth.loggedIn) {
		PlacementTest.start($scope.auth.user)
		    .then(function() {
			$scope.question = PlacementTest.getCurrentQuestion();
			$scope.question.userAnswer = "";
			$scope.questionTpl = questionTplId[$scope.question.question.type];
		    });
	    }
	}]);
