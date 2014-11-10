'use strict';

angular.module('plaza.controllers', [])
    .controller('PlazaCtrl', [
	'$scope', 'Plaza', 'Profile',
	function($scope, Plaza, Profile) {
	    Profile.getProfile($scope.auth.user)
		.then(function() {
		    $scope.profile = Profile.getData().user_info;
		}).then(function() {
		    Profile.getProfileDetail($scope.auth.user)
			.then(function() {
			    $scope.profileDetail = Profile.getDetail();
			    $scope.expChart = {
				labels: $scope.profileDetail.exp_chart.days,
				datasets: [{
				    label: "",
				    fillColor : "rgba(220,220,220,0.2)",
				    strokeColor : "#848484",
				    pointColor : "#810c15",
				    pointStrokeColor : "#fff",
				    pointHighlightFill : "#fff",
				    pointHighlightStroke : "rgba(220,220,220,1)",
				    data : $scope.profileDetail.exp_chart.exp
				}]
			    };
			});
		});

	    Plaza.get().then(function(response) {
		$scope.plaza = response.data;
	    });

	    $scope.buy = function(id) {
		
	    };
	}
    ]);
