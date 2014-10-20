'use strict';

angular.module('course.services', [])
    .factory('Course', ['CourseServices', '$localStorage', function(CourseServices, $localStorage) {
	var Course = function() {};

	Course.prototype.setData = function(data) {
	    Course.list = data;
	};

	Course.prototype.getData = function(data) {
	    return Course.list;
	};

	Course.prototype.getCourse = function(data) {
	    return Course.course;
	};

	Course.prototype.list = function(data) {
	    return CourseServices.courses(data)
		.then(function(response) {
		    Course.list = response.data;
		});
	};

	Course.prototype.selectCourse = function(data) {
	    return CourseServices.selectCourse(data)
		.then(function(response) {
		    Course.course = response.data;
		    $localStorage.auth.current_course = Course.course;
		});
	};

	return new Course();
    }])
    .factory('CourseServices', [ '$http', '$q', function($http, $q) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.2",
	    BASE_URL = HOST + API_VERSION;

	return {
	    courses: function(data) {
		var deferred = $q.defer();

		$http.get(BASE_URL + '/courses?auth_token=' + data.auth_token)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    },
	    selectCourse: function(data) {
		var deferred = $q.defer();

		$http.post(BASE_URL + '/users/select_course', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
