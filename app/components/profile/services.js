'use strict';

angular.module('profile.services', [])
    .factory('Profile', ['ProfileServices', function(ProfileServices) {
	var Profile = function() {};

	Profile.prototype.setData = function(data) {
	    Profile.data = data;
	};

	Profile.prototype.getData = function() {
	    return Profile.data;
	};

	Profile.prototype.getProfile = function(data) {
	    return ProfileServices.profile(data)
		.then(function(response) {
		    Profile.data = response.data;
		});
	};

	return new Profile();
    }])
    .factory('ProfileServices', ['$http', '$q', function($http, $q) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.2",
	    BASE_URL = HOST + API_VERSION;

	return {
	    profile: function (data) {
		var deferred = $q.defer();

		$http.get(BASE_URL + '/users/' + data._id + '?auth_token=' + data.auth_token)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
