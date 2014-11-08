'use strict';

angular.module('home.controller', ['app.services'])
    .controller('HomeCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeMainCtrl', [
	'$scope', 'Profile', 'TreeBuilder',
	'AppSetting',
	function($scope, Profile, TreeBuilder, AppSetting) {
	    Profile.getProfile($scope.auth.user)
		.then(function() {
		    $scope.profile = Profile.getData().user_info;
		})
		.then(AppSetting.get)
		.then(function() {
		    TreeBuilder.getCheckpoints();
		    TreeBuilder.getSkills();
		    TreeBuilder.getTree();
		    $scope.skillTree = TreeBuilder.build();
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
	}
    ])
    .controller('PlacementTestModalCtrl', [
	'$scope', '$modal', '$localStorage',
	function($scope, $modal, $localStorage) {
	    $scope.open = function() {
		var modalInstance = $modal.open({
		    templateUrl: 'home/_placement-test-modal.html',
		    controller: 'PlacementTestModalInstanceCtrl',
		    windowClass: 'placement-test-modal',
		    backdrop: 'static'
		});

		modalInstance.result.then(function(msg) {
		});
	    };

	    $scope.$watch('auth.user', function() {
		if ($localStorage.auth.user.is_beginner) {
		    $scope.open();
		}
	    });
	}])
    .controller('PlacementTestModalInstanceCtrl', [
	'$scope', '$modalInstance',
	function($scope, $modalInstance) {
	    $scope.close = function() {
		$modalInstance.close();
	    };
	}
    ]);
