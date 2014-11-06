'use strict';

angular.module('app.services', [])
    .factory('AppSetting', [
	'AppServices', '$localStorage',
	function(AppServices, $localStorage) {
	    var Setting = {};

	    Setting.get = function() {
		return AppServices.get().then(function(response) {
		    $localStorage.appSetting = response.data;
		});
	    };

	    return Setting;
	}
    ])
    .factory('AppServices', [
	'$http', '$q', '$localStorage',
	function($http, $q, $localStorage) {
	    var HOST = 'http://api.memo.edu.vn/api',
		API_VERSION = '/v1.4',
		BASE_URL = HOST + API_VERSION;

	    var AppServices = {};

	    AppServices.get = function(data) {
		var deferred = $q.defer();
		var authToken = $localStorage.auth.user.auth_token;

		$http.get(BASE_URL + '/appsettings?auth_token=' + authToken + '&device=web')
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };

	    return AppServices;
	}
    ]);
