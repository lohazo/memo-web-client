'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('leaderboard.controllers', [])
    .controller('LeaderboardCtrl', ['$scope', 'Leaderboard', function($scope, Leaderboard) {
	$scope.search = {
	    name: ''
	};
	$scope.showTheLeaderboard = function() {
	    $scope.showLeaderboard = true;
	    $scope.showFbFriends = false;
	    $scope.showFriends = false;
	};
	$scope.searchFbFriends = function() {
	    Leaderboard.fbFriends().then(function(response) {
		$scope.fbFriends = response.data.data;
	    });
	    $scope.showLeaderboard = false;
	    $scope.showFbFriends = true;
	    $scope.showFriends = false;
	};
	$scope.searchFriends = function() {
	    $scope.showLeaderboard = false;
	    $scope.showFbFriends = false;
	    $scope.showFriends = true;
	};
	$scope.showTheLeaderboard();

    }])
    .controller('LeaderboardHomeCtrl', ['$scope', function($scope) {
	// dirty checking
	$scope.$watch('profile', function() {
	    $scope.tabs = [
		{'title': "Tuần này", 'users': $scope.profile.followings_leaderboard_by_week},
		{'title': "Tháng này", 'users': $scope.profile.followings_leaderboard_by_month},
		{'title': "Tổng cộng", 'users': $scope.profile.followings_leaderboard_all_time}
	    ];
	});
    }])
    .controller('LeaderboardFbFriendsCtrl', ['$scope', function($scope) {
    }])
    .controller('LeaderboardFriendsCtrl', ['$scope', 'Leaderboard', function($scope, Leaderboard) {
	$scope.search = {
	    keywords: ''
	};
	$scope.searchMemoFriends = function() {
	    var reqData = {
		keywords: $scope.search.keywords,
		auth_token: $scope.user.user_info.auth_token
	    };
	    Leaderboard.friends(reqData).then(function(response) {
		$scope.friends = response.data;
	    });
	};
	$scope.follow = function(id) {
	    var reqData = {
		auth_token: $scope.user.user_info.auth_token,
		friend_id: id
	    };
	    Leaderboard.follow(reqData).then(function(response) {
		var friend = $scope.friends.filter(function(friend) {
		    return friend.user_id === id;
		})[0];
		friend.is_following = true;
	    });
	};
	$scope.unfollow = function(id) {
	    var reqData = {
		auth_token: $scope.user.user_info.auth_token,
		friend_id: id
	    };
	    Leaderboard.unfollow(reqData).then(function(response) {
		var friend = $scope.friends.filter(function(friend) {
		    return friend.user_id === id;
		})[0];
		friend.is_following = false;
	    });
	};
    }]);
