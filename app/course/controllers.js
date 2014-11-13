'use strict';

angular.module('course.controllers', [])
    .controller('CourseCtrl', [
	'$scope',
	'$window',
	'Course',
	function($scope, $window, Course) {
	    Course.list().then(function() {
		$scope.courses = Course.getData();
	    });

	    $scope.selectCourse = function(courseId) {
		var requestData = {
		    base_course_id: courseId
		};

		Course.selectCourse(requestData)
		    .then(function() {
		    	$window.location.href = '/';
		    });
	    };
	}]);
