(function(angular) {

  'use strict';

  function LeaderboardCtrl($scope, $localStorage, Leaderboard, AppServices) {
    $scope.follow = function(id) {
      var reqData = {
        friend_id: id
      };
      Leaderboard.follow(reqData).then(function() {
        var friend = $scope.friends.filter(function(friend) {
          return friend.user_id === id;
        })[0];
        friend.is_following = true;
      });
    };

    $scope.unfollow = function(id) {
      var reqData = {
        friend_id: id
      };
      Leaderboard.unfollow(reqData).then(function() {
        var friend = $scope.friends.filter(function(friend) {
          return friend.user_id === id;
        })[0];
        friend.is_following = false;
      });
    };

    $scope.showTheLeaderboard = function() {
      $scope.showLeaderboard = true;
      $scope.showFbFriends = false;
      $scope.showFriends = false;
    };

    $scope.searchFbFriends = function() {
      Leaderboard.fbFriends().then(function(response) {
        $scope.friends = response.data;
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
  }

  /*
     * data = {auth_token: , page: , friend_id: , type :}
     */
  function LeaderboardHomeCtrl($scope, Profile, $http, $q, $localStorage, API) {

    $scope.profile = Profile.detail;
    $scope.$on('event-profileLoaded', function(e, data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

        // LeaderBoard all time
      $http.get(API + '/users/' + userId + '/leaderboard?auth_token=' + authToken + '&type=alltime' + '&page=0')
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        // LeaderBoard by month  
      $http.get(API + '/users/' + userId + '/leaderboard?auth_token=' + authToken + '&type=month' + '&page=0')
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        // LeaderBoard by week 
      $http.get(API + '/users/' + userId + '/leaderboard?auth_token=' + authToken + '&type=week' + '&page=0')
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });    
      return deferred.promise;
    });

    $scope.$watch('profile', function() {
      if ($scope.$on) {
        $scope.tabs = [{
          'title': "Tuần này",
          'users': $scope.profile.leaderboard_by_week,
          'active': true
        }, {
          'title': "Tháng này",
          'users': $scope.profile.leaderboard_by_month,
          'active': false
        }, {
          'title': "Tổng cộng",
          'users': $scope.profile.alltime,
          'active': false
        }];
      }
    });
  }


  function LeaderboardFbFriendsCtrl($scope) {
    $scope.search = {
      username: ''
    };
  }

  function LeaderboardFriendsCtrl($scope, Leaderboard) {
    $scope.search = {
      keywords: ''
    };
    $scope.searchMemoFriends = function() {
      var reqData = {
        keywords: $scope.search.keywords
      };
      Leaderboard.friends(reqData)
        .then(function(response) {
          $scope.friends = response.data;
        });
    };
  }

  function LeaderboardEmailInviteCtrl($scope, Leaderboard) {
    $scope.email = "";
    $scope.sendEmail = function() {
      if ($scope.email.length > 0) {
        Leaderboard.inviteMail({
          email: $scope.email
        });
      }
    };
  };

  angular.module('leaderboard.controllers', [])
    .controller('LeaderboardCtrl', ['$scope', '$localStorage', 'Leaderboard', LeaderboardCtrl])
    .controller('LeaderboardHomeCtrl', ['$scope', 'Profile', '$http', '$q', '$localStorage', 'API', LeaderboardHomeCtrl])
    .controller('LeaderboardFbFriendsCtrl', ['$scope', LeaderboardFbFriendsCtrl])
    .controller('LeaderboardFriendsCtrl', ['$scope', 'Leaderboard', LeaderboardFriendsCtrl])
    .controller('LeaderboardEmailInviteCtrl', ['$scope', 'Leaderboard', LeaderboardEmailInviteCtrl]);
}(window.angular));