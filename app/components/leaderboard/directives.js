'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('leaderboard.directives', [])
    .directive('leaderboard', function() {
	return {
	    restrict: 'EA',
	    scope: true,
	    link: function($scope, $ele, $attrs) { },
	    controller: 'LeaderboardCtrl',
	    templateUrl: 'leaderboard/_leaderboard.html'
	};
    })
    .directive('leaderboardFbFriends', function() {
	return {
	    restrict: 'EA',
	    link: function($scope, $ele) { },
	    scope: true,
	    controller: 'LeaderboardFbFriendsCtrl',
	    templateUrl: 'leaderboard/_facebook-search.html'
	};
    })
    .directive('leaderboardFriends', function() {
	return {
	    restrict: 'EA',
	    link: function($scope) { },
	    scope: true,
	    controller: 'LeaderboardFriendsCtrl',
	    templateUrl: 'leaderboard/_search.html'
	};
    })
;
