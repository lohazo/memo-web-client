'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('leaderboard.services', [])
    .factory('Leaderboard', ['LeaderboardServices', function(LeaderboardServices) {
	var Leaderboard = function() {};
    }])
    .factory('LeaderboardServices', ['$http', '$q', function($http, $q) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.3",
	    BASE_URL = HOST + API_VERSION;
	return {
	    fbFriends: function(data) {
		var deferred = $q.defer();

		$http.get('/assets/data/fb_friends.json').then(function(fbFriends) {
		    deferred.resolve(fbFriends);
		});

		return deferred.promise;
	    },
	    friends: function(data) {
		var deferred = $q.defer();

		$http.post(BASE_URL + '/users/search_friends', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    },
	    follow: function(data) {
		var deferred = $q.defer();

		$http.post(BASE_URL + '/users/follow', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    },
	    unfollow: function(data) {
		var deferred = $q.defer();

		$http.post(BASE_URL + '/users/unfollow', data).then(function(response) {
		    deferred.resolve(response);
		});

		return deferred.promise;
	    }
	};
    }]);
