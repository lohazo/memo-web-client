'use strict';

angular.module('course.services', [])
    .factory('Course', ['CourseServices', function(CourseServices) {
	var Course = function() {};
	
	Course.prototype.setData = function(data) {
	    this.data = data;
	};

	Course.prototype.getData = function(data) {
	    return this.data;
	};
	
	Course.prototype.getCourses = function(data) {
	    CourseServices.courses(data).then(function(response) {
		Course.data = response.data;
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
