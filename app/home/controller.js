'use strict';

angular.module('home.controller', [])
    .controller('HomeCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeMainCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeCourseCtrl', [
	'$scope',
	'Course',
	function($scope, Course) {
	    Course.list($scope.auth.user).then(function() {
		$scope.courses = Course.getData();
	    });

	    $scope.selectCourse = function(courseId) {
		var requestData = {
		    auth_token: $scope.auth.user.auth_token,
		    base_course_id: courseId
		};

		Course.selectCourse(requestData)
		    .then(function() {
			$scope.auth.current_course = Course.getCourse();
		    });
	    };
	}]);
