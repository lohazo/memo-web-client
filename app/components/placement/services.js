'use strict';

angular.module('placement.services', [])
    .factory('Placement', [
	'PlacementServices', function(PlacementServices) {
	    var Placement = function() {};

	    Placement.prototype.start = function(data) {
		return PlacementServices.start(data)
		    .then(function(response) {
			Placement.currentQuestion = response.data;
		    });
	    };

	    Placement.prototype.getCurrentQuestion = function() {
		return Placement.currentQuestion;
	    };

	    Placement.prototype.skip = function(data) {
		return PlacementServices.submitAnswer(data)
		    .then(function(response) {
			Placement.currentQuestion = response.data;
		    });
	    };

	    Placement.prototype.submitAnswer = function(data) {
		return PlacementServices.submitAnswer(data)
		    .then(function(response) {
			Placement.currentQuestion = response.data;
		    });
	    };
	    return new Placement();
	}])
    .factory('PlacementServices', ['$http', '$q', function($http, $q) {
	var HOST = 'http://api.memo.edu.vn/api',
	    API_VERSION = '/v1.2',
	    BASE_URL = HOST + API_VERSION;

	return {
	    start: function(data) {
		var deferred = $q.defer();

		var requestData = {
		    device: 'web',
		    auth_token: data.auth_token,
		    speak_enabled: false
		};

		$http.post(BASE_URL + '/placement_test/start', requestData)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    },
	    submitAnswer: function(data) {
		var deferred = $q.defer();

		data.device = 'web';
		data.speak_enabled = false;

		$http.post(BASE_URL + '/placement_test/submit_answer', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
