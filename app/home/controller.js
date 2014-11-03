'use strict';

angular.module('home.controller', [])
    .controller('HomeCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeMainCtrl', [
	'$scope', 'Profile', 'Course', 'TreeBuilder',
	function($scope, Profile, Course, TreeBuilder) {
	    Profile.getProfile($scope.auth.user)
		.then(function() {
		    $scope.profile = Profile.getData().user_info;
		})
		.then(function() {
		    TreeBuilder.getCheckpoints();
		    TreeBuilder.getSkills();
		    TreeBuilder.getTree();
		    $scope.skillTree = TreeBuilder.build();
		});

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
	}
    ])
    .controller('HomeCourseCtrl', [
	'$scope',
	'Course',
	function($scope, Course) {
	    Course.list($scope.auth.user).then(function() {
		$scope.courses = Course.getData();
	    });

	    $scope.selectCourse = function(courseId) {
		var requestData = {
		    base_course_id: courseId
		};

		Course.selectCourse(requestData)
		    .then(function() {
			$scope.auth.current_course = Course.getCourse();
		    });
	    };
	}]);
