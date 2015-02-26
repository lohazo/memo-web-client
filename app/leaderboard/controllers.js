(function (angular) {

  'use strict';

  function LeaderboardCtrl($scope, Leaderboard) {
    $scope.users = [];

    $scope.search = {
      username: '',
      keywords: ''
    };

    $scope.follow = function (id) {
      var reqData = {
        friend_id: id
      };
      Leaderboard.follow(reqData).then(function () {
        var friend = $scope.users.filter(function (friend) {
          return friend._id === id;
        })[0];
        console.log($scope.users, friend);
        if (friend) friend.is_following = true;
      });
    };

    $scope.unfollow = function (id) {
      var reqData = {
        friend_id: id
      };
      Leaderboard.unfollow(reqData).then(function () {
        var friend = $scope.users.filter(function (friend) {
          return friend._id === id;
        })[0];
        console.log($scope.users, friend);
        if (friend) friend.is_following = false;
      });
    };

    $scope.searchMemoFriends = function () {
      var reqData = {
        keywords: $scope.search.keywords
      };
      Leaderboard.friends(reqData)
        .then(function (response) {
          $scope.users = response.data.friends;
        });
    };

    $scope.showTheLeaderboard = function () {
      $scope.showLeaderboard = true;
      $scope.showFbFriends = false;
      $scope.showFriends = false;
    };

    $scope.searchFbFriends = function () {
      Leaderboard.fbFriends().then(function (response) {
        $scope.users = response.data.friends;
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
  }

  function LeaderboardHomeCtrl($scope, Leaderboard) {
    $scope.tabs = [{
      'title': "Tuần này",
      'active': true
    }, {
      'title': "Tháng này",
      'active': false
    }, {
      'title': "Tổng cộng",
      'active': false
    }];

    // Get leaderboard by week
    Leaderboard.leaderboard({
      type: 'week'
    }).then(function (response) {
      $scope.tabs[0].users = response.data.leaderboard_by_week;
    });

    Leaderboard.leaderboard({
      type: 'month'
    }).then(function (response) {
      $scope.tabs[1].users = response.data.leaderboard_by_month;
    });

    Leaderboard.leaderboard({
      type: 'all_time'
    }).then(function (response) {
      $scope.tabs[2].users = response.data.leaderboard_all_time;
    });
  }

  function LeaderboardEmailInviteCtrl($scope, Leaderboard) {
    $scope.email = "";
    $scope.sendEmail = function () {
      if ($scope.email.length > 0) {
        Leaderboard.inviteMail({
          email: $scope.email
        });
      }
    };
  }

  angular.module('leaderboard.controllers', [])
    .controller('LeaderboardCtrl', ['$scope', 'Leaderboard', LeaderboardCtrl])
    .controller('LeaderboardHomeCtrl', ['$scope', 'Leaderboard', LeaderboardHomeCtrl])
    .controller('LeaderboardEmailInviteCtrl', ['$scope', 'Leaderboard',
      LeaderboardEmailInviteCtrl
    ]);
}(window.angular));