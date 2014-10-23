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

		// if ($scope.result.result) {
		//     $scope.footerTpl = "footerFailure";
		// } else {
		//     $scope.footerTpl = "footerResult";
		// }
	    };

	    $scope.nextQuestion = function() {

		var requestData = {
		    auth_token: $scope.auth.user.auth_token,
		    exam_token: $scope.question.exam_token
		};
		// FIXME:
		requestData.answer ='{"' + $scope.question.question.question_log_id + '":' + $scope.result.result + "}";

		PlacementTest.submitAnswer(requestData)
		    .then(function() {
			$scope.footerTpl = "footer";
			$scope.result = { };
			$scope.question = PlacementTest.getCurrentQuestion();
			$scope.question.userAnswer = "";
			$scope.questionTpl = questionTplId[$scope.question.question.type];
		    });
	    };

	    if ($scope.auth.loggedIn) {
		PlacementTest.start($scope.auth.user)
		    .then(function() {
			// $scope.question = PlacementTest.getCurrentQuestion();
			$scope.question = {"exam_token":"HaiNguyenPhan_54491395b298b","question":{"type":"judge","question":"M\u1ed9t c\u1eadu b\u00e9 v\u00e0 m\u1ed9t c\u00f4 b\u00e9 \u0103n.","hints":["A boy and a girl eat."],"options":["The man and the woman","I am a boy and I eat an apple.","A boy and a girl eat."],"question_log_id":"5449139548177e40138b456d"}};
			$scope.question.userAnswer = "";
			$scope.questionTpl = questionTplId[$scope.question.question.type];
		    });
	    }
	}]);
// {"exam_token":"HaiNguyenPhan_54491395b298b","question":{"type":"judge","question":"M\u1ed9t c\u1eadu b\u00e9 v\u00e0 m\u1ed9t c\u00f4 b\u00e9 \u0103n.","hints":["A boy and a girl eat."],"options":["The man and the woman","I am a boy and I eat an apple.","A boy and a girl eat."],"question_log_id":"5449139548177e40138b456d"}}
// $scope.question = {"exam_token":"HaiNguyenPhan_54487410b2c3b","question":{"type":"listen","question":"He eats.","normal_question_audio":"http:\/\/api.memo.edu.vn\/static\/1.1\/sentence_sounds\/normal_72673a80-4df1-4a92-94f1-4033cb35e6cf.mp3","slow_question_audio":"http:\/\/api.memo.edu.vn\/static\/1.1\/sentence_sounds\/slow_72673a80-4df1-4a92-94f1-4033cb35e6cf.mp3","question_log_id":"5448741048177ec62c8b4568"}};
// {"exam_token":"HaiNguyenPhan_5448b175d10bb","question":{"type":"translate","question":"C\u1eadu b\u00e9","translation":"Boy","compact_translations":[["Boy"]],"common_errors":[],"question_log_id":"5448b17548177eff5d8b456e"}}
// {"Exam_token":"HaiNguyenPhan_54487410b2c3b","question":{"type":"listen","question":"He eats.","normal_question_audio":"http:\/\/api.memo.edu.vn\/static\/1.1\/sentence_sounds\/normal_72673a80-4df1-4a92-94f1-4033cb35e6cf.mp3","slow_question_audio":"http:\/\/api.memo.edu.vn\/static\/1.1\/sentence_sounds\/slow_72673a80-4df1-4a92-94f1-4033cb35e6cf.mp3","question_log_id":"5448741048177ec62c8b4568"}};
