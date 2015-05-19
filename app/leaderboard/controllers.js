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

  function LeaderboardHomeCtrl($scope, AppSetting) {
    if (AppSetting.sharedSettings) {
      $scope.should_profile = AppSetting.sharedSettings.functionaly.should_profile;
    } else {
      $scope.should_profile = false;
    };
   

    $scope.$watch('leaderboardData', function () {
      if ($scope.leaderboardData.length > 0) {
        $scope.tabs = [{
          'title': "Tuần này",
          'users': $scope.leaderboardData[0],
          'active': true
        }, {
          'title': "Tháng này",
          'users': $scope.leaderboardData[1],
          'active': false
        }, {
          'title': "Tổng cộng",
          'users': $scope.leaderboardData[2],
          'active': false
        }];
      }
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
    .controller('LeaderboardHomeCtrl', ['$scope', 'AppSetting', 'Leaderboard', LeaderboardHomeCtrl])
    .controller('LeaderboardEmailInviteCtrl', ['$scope', 'Leaderboard',
      LeaderboardEmailInviteCtrl
    ]);
}(window.angular));