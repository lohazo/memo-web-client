(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $window, $location, Profile, TreeBuilder, AppSetting, MemoTracker,
    Message, ReferralService, Leaderboard, PopupServices, $modal, BannerServices) {
    $scope.max = 12;
    $scope.dynamic = 6;
    $scope.double = function () {
      $scope.dynamic = $scope.dynamic * 2;
    }
    $scope.islands = [{
      title: 'Đảo Kiến số 1',
      is_unlock: true,
      lessons_length: 8,
      finished_lesson: 8,
      strength_gap: 4,
      icon_url: 'https://lh3.googleusercontent.com/-fGI6PCREH28/VYHPHPmEUFI/AAAAAAACDxA/93WO01VaS9A/s0/island-1-icon.png'
    },{
      title: 'Đảo Kiến số 2',
      is_unlock: true,
      lessons_length: 8,
      finished_lesson: 8,
      strength_gap: 4,
      icon_url: 'https://lh3.googleusercontent.com/-UR3Y1bpWdrw/VYHPZj-2klI/AAAAAAACDxI/3chMXBSiekA/s0/island-2-icon.png'
    },{
      title: 'Đảo Kiến số 3',
      is_unlock: false,
      lessons_length: 12,
      finished_lesson: 6,
      strength_gap: 0,
      icon_url: 'https://lh3.googleusercontent.com/-j_Livxh3Qxw/VYHPbSN_RjI/AAAAAAACDxQ/MM9OFXnTFhM/s0/island-3-icon.png'
    },{
      title: 'Đảo Kiến số 4',
      is_unlock: false,
      lessons_length: 12,
      finished_lesson: 0,
      strength_gap: 0,
      icon_url: 'https://lh3.googleusercontent.com/-oY0bC4ui6Po/VYHPbvhKd3I/AAAAAAACDxU/LE4WwUlgbho/s0/island-4-icon.png'
    },{
      title: 'Đảo Kiến số 5',
      is_unlock: false,
      lessons_length: 15,
      finished_lesson: 10,
      strength_gap: 0,
      icon_url: 'https://lh3.googleusercontent.com/-UFh1SmnNPgI/VYHPcAqlUTI/AAAAAAACDxc/SO0NJal0Rrc/s0/island-5-icon.png'
    }]
    
    $scope.leaderboardData = [];
 
    $scope.trackingBannerNative = function () {
      MemoTracker.track('skill tree plaza ad click');
    };

    $scope.sharedSettings = {
      functionaly: {
        should_weakest_word: true,
        should_share_facebook: true,
        should_banner_update_birthday: true
      }
    };

    $scope.$on('event-sharedSettingsLoaded', function () {
      $scope.sharedSettings = AppSetting.sharedSettings;
    });

    $scope.shareMaxSkill = function () {
      if (AppSetting.sharedSettings.functionaly.should_share_facebook) {
        return AppSetting.getMaxSkillFacebookContent().then(function (response) {
          var data = response.data;
          data.method = 'feed';

          FB.ui(data, function (response) {});
        });
      };
    };

    function getPopup() {
      PopupServices.getPopup().success(function (data) {
        if (data._id) {
          var modalInstance = $modal.open({
            templateUrl: 'popup/_index.html',
            controller: 'PopupCtrl',
            windowClass: 'popup-modal',
            backdrop: 'static',
            resolve: {
              popups: function () {
                return data;
              },
            }
          });

          modalInstance.result.then(function (msg) {
            console.log(msg);
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        };
      });
    }

    function getBanner() {
      BannerServices.getBanner().success(function (data) {
        $scope.banner = data;
      });
    }

    function getProfile() {
      return Profile.getProfile().then(function () {
        $scope.profile = Profile.getUser();
        if ($scope.auth.loggedIn && !$location.host().match(/(^memo.|.net.vn$|.local$)/g)) {
          $window.location = 'http://memo.edu.vn/';
          return;
        }
      });
    }

    function buildTree() {
      TreeBuilder.getCheckpoints();
      TreeBuilder.getSkills();
      TreeBuilder.getTree();
      $scope.skillTree = TreeBuilder.build();

      $scope.iconSets = TreeBuilder.iconSets;
      MemoTracker.track('skills tree');
    }

    function getProfileDetail() {
      return Profile.getProfileDetail()
        .then(function () {
          $scope.profileDetail = Profile.detail;
          $scope.expChart = {
            labels: $scope.profileDetail.exp_chart.days,
            datasets: [{
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "#848484",
              pointColor: "#810c15",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: $scope.profileDetail.exp_chart.exp
            }]
          };
          $rootScope.$broadcast('event-profileLoaded', Profile.detail);
        });
    }

    function takeATour() {
      if (AppSetting.shouldDisplayTour()) {
        $scope.displayTour = AppSetting.displayTour;
        $location.path('/welcome');
      }
    }

    function getStatus() {
      $scope.FBShare = {
        shareType: 'referral-code'
      };
      ReferralService.getStatus().then(function (res) {
        $scope.referral = res.data;
        $scope.referral.record.code = res.data.record.code || 0;
        $scope.referral.record.invited_count = res.data.record.invited_count || 0;
        $scope.FBShare.shareData = res.data.referral_code;
      });
    }

    function getLeaderboardData() {
      // Get leaderboard by week
      Leaderboard.leaderboard({
        type: 'week'
      }).then(function (res1) {
        Leaderboard.leaderboard({
          type: 'month'
        }).then(function (res2) {
          Leaderboard.leaderboard({
            type: 'all_time'
          }).then(function (res3) {
            $scope.leaderboardData = [res1.data.leaderboard_by_week, res2.data.leaderboard_by_month,
              res3.data.leaderboard_all_time
            ];
          });
        });
      });
    }

    // Chain calls
    getProfile()
      .then(AppSetting.getSharedSettings)
      .then(function () {
        $scope.sharedSettings = AppSetting.shared_settings;
        $rootScope.$broadcast('event-sharedSettingsLoaded');
      })
      .then(Message.list)
      .then(getProfileDetail)
      .then(getStatus)
      .then(TreeBuilder.getIconSets)
      .then(buildTree)
      .then(takeATour)
      .then(getLeaderboardData)
      .then(getPopup)
      .then(getBanner)
      .then(AppSetting.getWords);
  }

  function PlacementTestModalCtrl($scope, $modal, AppSetting) {

    $scope.profile = {};
    $scope.displayTour = false;
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'home/_placement-test-modal.html',
        controller: 'PlacementTestModalInstanceCtrl',
        windowClass: 'placement-test-modal',
        backdrop: 'static'
      });

      modalInstance.result.then(function (msg) {});

      $scope.$watch('displayTour', function () {
        if ($scope.displayTour) modalInstance.close();
      });
    };

    $scope.$watch('profile', function () {
      if ($scope.profile.is_beginner && $scope.profile.allow_placement_test) {
        $scope.open();
      }
    });
  }

  function PlacementTestModalInstanceCtrl($scope, $modalInstance, Profile) {
    $scope.profile = Profile.user;
    $scope.close = function () {
      $modalInstance.close();
    };
    $scope.$on('event:auth-logoutConfirmed', function () {
      $scope.close();
    });
  }

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$window', '$location', 'Profile', 'TreeBuilder',
      'AppSetting', 'MemoTracking', 'Message', 'ReferralService', 'Leaderboard', 'PopupServices', '$modal', 'BannerServices',
      HomeMainCtrl
    ])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', 'AppSetting', 'ReferralService',
      PlacementTestModalCtrl
    ])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance', 'Profile',
      PlacementTestModalInstanceCtrl
    ]);

}(window.angular));