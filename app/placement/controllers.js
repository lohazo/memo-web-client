'use strict';

angular.module('placement.controllers', [])
    .controller('PlacementCtrl', [
	'$scope', '$rootScope', '$location', 'Placement', 'Question',
	function($scope, $rootScope, $location, PlacementTest, Question) {
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

		$scope.footerTpl = "footer";
		$scope.questionTpl = "";

		PlacementTest.submitAnswer(requestData)
		    .then(function() {
			$scope.question = PlacementTest.getCurrentQuestion();
			// $scope.question = {
			//     "finish_exam_bonus_exp": 0,
			//     "leveled_up": false,
			//     "exp_chart": {
			// 	"days": ["Sa","Su","Mo","Tu","We","Th","Fr"],
			// 	"exp": [0,0,0,0,1010,0,0]
			//     },
			//     "combo_days": 1,
			//     "affected_skill": {
			// 	"_id": "en-vi_dai_tu_quan_he",
			// 	"order": 1,
			// 	"title": "Đại từ quan hệ",
			// 	"slug": "Đại từ Q.hệ",
			// 	"theme_color": "#99cc00"
			//     },
			//     "num_affected_skills": 37
			// };
			$scope.question.userAnswer = "";
			if ($scope.question.question) {
			    $scope.questionTpl = questionTplId[$scope.question.question.type];
			    $scope.result = { };
			} else {
			    if ($scope.question.finish_exam_bonus_exp === 0 &&
				$scope.question.num_affected_skills.length === 0) {

				$scope.questionTpl = 'questionFailure';
				$scope.footerTpl = 'footerFailure';
			    } else {
				$scope.questionTpl = 'questionSuccess';
				$scope.footerTpl = 'footerSuccess';
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
				$scope.result = { };
			    }
			}
		    });
	    };

	    PlacementTest.start($scope.auth.user)
		.then(function() {
		    $scope.question = PlacementTest.getCurrentQuestion();
		    $scope.question.userAnswer = "";
		    $scope.questionTpl = questionTplId[$scope.question.question.type];
		});
	}]);
