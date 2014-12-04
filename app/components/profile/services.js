'use strict';

angular.module('profile.services', [])
    .factory('Profile', ['ProfileServices', '$localStorage', function(ProfileServices, $localStorage) {
	var Profile = {};

	Profile.data = {};
	Profile.detail = {};

	Profile.getProfile = function(data) {
	    return ProfileServices.profile(data)
		.then(function(response) {
		    Profile.data = response.data;
		    $localStorage.auth.user = Profile.data.user_info;
		    $localStorage.auth.skills_tree = Profile.data.skills_tree;
		    $localStorage.auth.checkpoints = Profile.data.checkpoints;
		    $localStorage.auth.skills = Profile.data.skills;
		});
	};

	Profile.getProfileDetail = function(data) {
	    return ProfileServices.profileDetail(data)
		.then(function(response) {
		    Profile.detail = response.data;
		    $localStorage.auth.profile_detail = Profile.detail;
		});
	};

	return Profile;
    }])
    .factory('ProfileServices', ['$http', '$q', '$location', function($http, $q, $location) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.5",
	    BASE_URL = HOST + API_VERSION;

	return {
	    profile: function(data) {
		var deferred = $q.defer();

		$http.get(BASE_URL + '/users/' + data._id + '?auth_token=' + data.auth_token)
		    .then(function(response) {
			deferred.resolve(response);
		    }, function(response) {
			if (response.status == 400) {
			    $location.path('/course');
			}
			deferred.reject(response);
		    });

		return deferred.promise;
	    },
	    profileDetail: function(data) {
		var deferred = $q.defer();

		$http.get(BASE_URL + '/users/profile_details'
			  + '?device=web&auth_token=' + data.auth_token)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    }
	};
    }]);
