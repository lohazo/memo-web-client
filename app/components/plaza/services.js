'use strict';

angular.module('plaza.services', [])
    .factory('Plaza', ['PlazaServices', '$localStorage', function(PlazaServices, $localStorage) {
	var Plaza = {};

	Plaza.data = {};

	Plaza.get = function(data) {
	    return PlazaServices.get(data).then(function(response) {
		Plaza.data = response.data;
	    });
	};

	Plaza.buy = function(data) {
	    return PlazaServices.buy(data)
		.then(function(response) {
		    $localStorage.auth.profile_detail.virtual_money = response.data.virtual_money;
		})
		.then(Plaza.get);
	};

	Plaza.use = function(data) {
	    return PlazaServices.use(data)
		.then(function(response) {
		    console.log(response);
		});
	};

	return Plaza;
    }])
    .factory('PlazaServices',[
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

		$http.post(BASE_URL + '/plaza/buy_item', data)
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

		$http.post(BASE_URL + '/plaza/use_item', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };
	    return Services;
	}
    ]);
