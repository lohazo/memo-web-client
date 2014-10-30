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

	    $scope.chartOptions = {
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",

		//Number - Width of the grid lines
		scaleGridLineWidth : 1,

		//Boolean - Whether the line is curved between points
		bezierCurve : false,

		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 4,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : false,

		tooltipTemplate: "<%= value %>",

		tooltipFillColor: "#810C15",

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
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

		$scope.footerTpl = "footer";
		$scope.questionTpl = "";

		PlacementTest.submitAnswer(requestData)
		    .then(function() {
			// $scope.question = PlacementTest.getCurrentQuestion();
			$scope.question = {
			    "finish_exam_bonus_exp": 0,
			    "leveled_up": false,
			    "exp_chart": {
				"days": ["Sa","Su","Mo","Tu","We","Th","Fr"],
				"exp": [0,0,0,0,1010,0,0]
			    },
			    "combo_days": 1,
			    "affected_skill": {
				"_id": "en-vi_dai_tu_quan_he",
				"order": 1,
				"title": "Đại từ quan hệ",
				"slug": "Đại từ Q.hệ",
				"theme_color": "#99cc00"
			    },
			    "num_affected_skills": 37
			};
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

	    if ($scope.auth.loggedIn) {
		PlacementTest.start($scope.auth.user)
		    .then(function() {
			$scope.question = PlacementTest.getCurrentQuestion();
			$scope.question.userAnswer = "";
			$scope.questionTpl = questionTplId[$scope.question.question.type];
		    });
	    }
	}]);
