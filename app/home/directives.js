'use strict';

angular.module('home.directives', [])
    .directive('appCourses', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: 'HomeCourseCtrl',
	    templateUrl: 'home/_courses.html'
	};
    })
    .directive('appMain', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: 'HomeMainCtrl',
	    templateUrl: 'home/_main.html'
	};
    })
    .directive('mainLeft', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'home/_main-left.html'
	};
    })
    .directive('mainCenter', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'home/_main-center.html'
	};
    })
    .directive('mainRight', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'home/_main-right.html'
	};
    });
