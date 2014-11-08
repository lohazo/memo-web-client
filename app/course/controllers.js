'use strict';

angular.module('course.controllers', [])
    .controller('CourseCtrl', [
	'$scope',
	'$location',
	'Course',
	function($scope, $location, Course) {
	    Course.list().then(function() {
		$scope.courses = Course.getData();
	    });

	    $scope.selectCourse = function(courseId) {
		var requestData = {
		    base_course_id: courseId
		};

		Course.selectCourse(requestData)
		    .then(function() {
		    	$location.path('/');
		    });
	    };
	}]);
