'use strict';

angular.module('home.controller', [])
    .controller('HomeCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeMainCtrl', ['$scope', function($scope) {
    }])
    .controller('HomeCourseCtrl', ['$scope', 'CourseServices', function($scope, Course) {
	Course.courses($scope.auth.user.user).then(function(response) {
	    $scope.courses = response.data;
	});
    }]);
