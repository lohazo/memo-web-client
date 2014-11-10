'use strict';

angular.module('plaza.services', [])
    .factory('Plaza',[
	'$http', '$q', '$localStorage',
	function($http, $q, $localStorage) {
	    var HOST = "http://api.memo.edu.vn/api",
		API_VERSION = "/v1.4",
		BASE_URL = HOST + API_VERSION;

	    var Services = {};

	    Services.get = function(data) {
		var deferred = $q.defer();

		var authToken = $localStorage.auth.user.auth_token;
		$http.get(BASE_URL + '/plaza?device=web&localize=vi&auth_token=' + authToken)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };

	    Services.buy = function(data) {
		var deferred = $q.defer();

		var authToken = $localStorage.auth.user.auth_token;

		data.auth_token = authToken;
		data.device = 'web';

		$http.post(BASE_URL + '/plaza/buy', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };

	    Services.use = function(data) {
		var deferred = $q.defer();

		var authToken = $localStorage.auth.user.auth_token;

		data.auth_token = authToken;
		data.device = 'web';

		$http.post(BASE_URL + '/plaza/use', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };
	    return Services;
	}
    ]);
