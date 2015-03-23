(function (angular) {
  'use strict';

  function LeaderboardHomeDirective() {
    return {
      restrict: 'EA',
      scope: {
        leaderboardData: "="
      },
      controller: 'LeaderboardHomeCtrl',
      templateUrl: 'leaderboard/_leaderboard.html'
    };
  }

  function LeaderboardFbFriendsDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'leaderboard/_search-facebook.html'
    };
  }

  function LeaderboardFriendsDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'leaderboard/_search.html'
    };
  }

  function LeaderboardEmailInviteDirective() {
    return {
      restrict: 'EA',
      scope: true,
      controller: 'LeaderboardEmailInviteCtrl',
      templateUrl: 'leaderboard/_email-invite.html'
    };
  }

  angular.module('leaderboard.directives', [])
    .directive('leaderboardHome', LeaderboardHomeDirective)
    .directive('leaderboardFbFriends', LeaderboardFbFriendsDirective)
    .directive('leaderboardFriends', LeaderboardFriendsDirective)
    .directive('leaderboardEmailInvite', LeaderboardEmailInviteDirective);
}(window.angular));