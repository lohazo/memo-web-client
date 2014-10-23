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

	    Placement.prototype.finish = function(data) {

	    };

	    Placement.prototype.skip = function() {
	    };

	    Placement.prototype.nextQuestion = function(data) {
		return PlacementServices.submitAnswer(data)
		    .then(function(response) {
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

		data.device = 'web';
		data.speake_enable = false;

		$http.post(BASE_URL + '/placement_test/start', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    },
	    submitAnswer: function(data) {
		var deferred = $q.defer();

		data.device = 'web';
		data.speake_enable = false;

		$http.post(BASE_URL + '/placement_test/submit_answer', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
