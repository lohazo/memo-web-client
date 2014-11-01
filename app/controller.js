'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.controllers', ['ngStorage'])
    .controller('AppCtrl', [
	'$scope',
	'$rootScope',
	'$localStorage',
	'$location',
	function($scope, $rootScope, $localStorage, $location) {
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
		$localStorage.auth = $scope.auth;
		$location.path('/');
	    });

	    if (!$scope.auth.loggedIn) {
		$location.path('/');
	    }

	    $scope.getNumber = function(num) {
		return new Array(num);
	    };
	}
    ]);
