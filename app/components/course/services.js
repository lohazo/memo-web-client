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

	Course.prototype.list = function() {
	    var data = {};
	    data.auth_token = $localStorage.auth.user.auth_token;
	    return CourseServices.courses(data)
		.then(function(response) {
		    Course.list = response.data;
		});
	};

	Course.prototype.selectCourse = function(data) {
	    data.auth_token = $localStorage.auth.user.auth_token;
	    return CourseServices.selectCourse(data)
		.then(function(response) {
		    Course.course = response.data.current_course;
		    $localStorage.auth.current_course = Course.course;
		});
	};

	return new Course();
    }])
    .factory('CourseServices', [ '$http', '$q', '$location', function($http, $q, $location) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.4",
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
		    .error(function(data, status, headers, config) {
			console.log(status);
			if (status === 400) {
			    $location.path('/course');
			}
		    }).then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
