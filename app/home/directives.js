'use strict';

angular.module('home.directives', [])
    .directive('appMain', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: 'HomeMainCtrl',
	    templateUrl: 'home/_main.html'
	};
    })
    .directive('appCourses', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: 'HomeCourseCtrl',
	    templateUrl: 'home/_courses.html'
	};
    });
