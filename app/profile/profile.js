(function (angular) {
  'use strict';

  function ProfileConfig($routeProvider) {
    $routeProvider.when('/profile/:id', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileFriendCtrl',
      resolve: {
        profileDetail: function ($route, ProfileServices) {
          return ProfileServices.profileDetail({
            'friend_id': $route.current.params.id
          });
        },
        res1: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'week'
          });
        },
        res2: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'month'
          });
        },
        res3: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'all_time'
          });
        }
      }
    });

    $routeProvider.when('/profile', {
      templateUrl: 'profile/_index.html',
      controller: 'ProfileCtrl',
      resolve: {
        profile: function (Profile) {
          return Profile.getProfile();
        },
        profileDetail: function (Profile) {
          return Profile.getProfileDetail();
        },
        res1: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'week'
          });
        },
        res2: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'month'
          });
        },
        res3: function (Leaderboard) {
          return Leaderboard.leaderboard({
            type: 'all_time'
          });
        }
      }
    });
  }

  function ProfileFriendCtrl($scope, profileDetail, res1, res2, res3) {
    $scope.profileDetail = profileDetail.data;
    $scope.leaderboardData = [];

    var ownedCourses = $scope.profileDetail.owned_courses;
    $scope.ownedCourses = [];

    var i = 0;
    for (i = 0; i < ownedCourses.length; i = i + 2) {
      $scope.ownedCourses.push([ownedCourses[i], ownedCourses[i + 1] || '']);
    }

    $scope.leaderboardData = [res1.data.leaderboard_by_week, res2.data.leaderboard_by_month,
      res3.data.leaderboard_all_time
    ];
  }

  function ProfileCtrl($scope, $routeParams, Profile, res1, res2, res3, $modal, badgeServices) {
    $scope.profile = Profile.user;
    $scope.profileDetail = Profile.detail;
    $scope.leaderboardData = [];

    badgeServices.getHighestOwnedBadges().success(function (data) {
      $scope.badges = data.owned_badges;
    });

    $scope.test = function (badge) {
      var modalInstance = $modal.open({
        templateUrl: 'badge/_badge-modal.html',
        controller: 'BadgeModalCtrl',
        windowClass: 'badge-modal',
        resolve: {
          badge: function () {
            return badge;
          }
        }
      });
    };

    var ownedCourses = $scope.profileDetail.owned_courses;
    $scope.ownedCourses = [];

    var i = 0;
    for (i = 0; i < ownedCourses.length; i = i + 2) {
      $scope.ownedCourses.push([ownedCourses[i], ownedCourses[i + 1] || '']);
    }

    $scope.leaderboardData = [res1.data.leaderboard_by_week, res2.data.leaderboard_by_month,
      res3.data.leaderboard_all_time
    ];
  }

  angular.module('profile', ['profile.services'])
    .controller('ProfileCtrl', ['$scope', '$routeParams', 'Profile', 'res1', 'res2', 'res3', '$modal', 'badgeServices', ProfileCtrl])
    .controller('ProfileFriendCtrl', ['$scope', 'profileDetail', 'res1', 'res2', 'res3',
      ProfileFriendCtrl
    ])
    .config(['$routeProvider', ProfileConfig]);
}(window.angular));