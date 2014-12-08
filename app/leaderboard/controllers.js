(function (angular) {

  'use strict';

  function LeaderboardCtrl($scope, $localStorage, Leaderboard) {
    $scope.profile = $localStorage.auth.profile_detail; 
    $scope.search = {
      name: ''
    };
    $scope.showTheLeaderboard = function () {
      $scope.showLeaderboard = true;
      $scope.showFbFriends = false;
      $scope.showFriends = false;
    };
    $scope.searchFbFriends = function () {
      console.log('hit');
      Leaderboard.fbFriends().then(function (response) {
        $scope.fbFriends = response.data.data;
      });
      $scope.showLeaderboard = false;
      $scope.showFbFriends = true;
      $scope.showFriends = false;
    };
    $scope.searchFriends = function () {
      $scope.showLeaderboard = false;
      $scope.showFbFriends = false;
      $scope.showFriends = true;
    };
    $scope.showTheLeaderboard();
    // dirty checking
    $scope.$watch('profile', function () {
      if ($scope.profile) {
        $scope.tabs = [{
          'title': "Tuần này",
          'users': $scope.profile.followings_leaderboard_by_week,
          'active': true
        }, {
          'title': "Tháng này",
          'users': $scope.profile.followings_leaderboard_by_month,
          'active': false
        }, {
          'title': "Tổng cộng",
          'users': $scope.profile.followings_leaderboard_all_time,
          'active': false
        }];
      }
    });
  }

  function LeaderboardFbFriendsCtrl() { }

  function LeaderboardFriendsCtrl($scope, Leaderboard) {

    $scope.search = {
      keywords: ''
    };
    $scope.searchMemoFriends = function () {
      var reqData = {
        keywords: $scope.search.keywords,
        auth_token: $scope.user.user_info.auth_token
      };
      Leaderboard.friends(reqData).then(function (response) {
        $scope.friends = response.data;
      });
    };
    $scope.follow = function (id) {
      var reqData = {
        auth_token: $scope.user.user_info.auth_token,
        friend_id: id
      };
      Leaderboard.follow(reqData).then(function () {
        var friend = $scope.friends.filter(function (friend) {
          return friend.user_id === id;
        })[0];
        friend.is_following = true;
      });
    };
    $scope.unfollow = function (id) {
      var reqData = {
        auth_token: $scope.user.user_info.auth_token,
        friend_id: id
      };
      Leaderboard.unfollow(reqData).then(function () {
        var friend = $scope.friends.filter(function (friend) {
          return friend.user_id === id;
        })[0];
        friend.is_following = false;
      });
    };
  }

  angular.module('leaderboard.controllers', [])
    .controller('LeaderboardCtrl', ['$scope', '$localStorage', 'Leaderboard', LeaderboardCtrl])
    .controller('LeaderboardFbFriendsCtrl', ['$scope', LeaderboardFbFriendsCtrl])
    .controller('LeaderboardFriendsCtrl', ['$scope', 'Leaderboard', LeaderboardFriendsCtrl]);
}(window.angular));