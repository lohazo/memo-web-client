(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $window, $location, Profile, TreeBuilder, AppSetting, MemoTracker,
    Message, ReferralService, Leaderboard, PopupServices, $modal) {
    $scope.leaderboardData = [];

    $scope.shareMaxSkill = function () {
      return AppSetting.getMaxSkillFacebookContent().then(function (response) {
        var data = response.data;
        data.method = 'feed';

        FB.ui(data, function (response) {});
      });
    };

    function getPopup() {
      PopupServices.getPopup().success(function (data) {
        var modalInstance = $modal.open({
          templateUrl: 'popup/_index.html',
          controller: 'PopupL0BCtrl',
          windowClass: 'buy-guide-popup-modal',
        });
      });
    }

    getPopup();

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
      .then(Message.list)
      .then(getProfileDetail)
      .then(getStatus)
      .then(AppSetting.getSharedSettings)
      .then(TreeBuilder.getIconSets)
      .then(buildTree)
      .then(takeATour)
      .then(getLeaderboardData)
      .then(AppSetting.getWords);
  }

  function CampaignVerifyCodeCtrl($scope, $route, ReferralService, Profile) {
    $scope.submitCode = function () {
      ReferralService.submitCode({
        referral_code: $scope.refCode
      }).then(function (res) {
        $scope.error = '';
        $scope.isReferral = res.data.code || '';
        $scope.userName = res.data.referral_user || '';
        $route.reload();
      }, function (res) {
        $scope.error = res.data.message;
      });
    };

    $scope.keydownHandler = function (e) {
      if (e.keyCode === 13) {
        $scope.submitCode();
      }
    };

    $scope.$watch('profileDetail', function () {
      if ($scope.profileDetail) {
        $scope.isReferral = Profile.detail.referral_user || '';
        $scope.userName = Profile.detail.referral_user;
      }
    });
  }

  function PlacementTestModalCtrl($scope, $modal) {

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

  function PlacementTestModalInstanceCtrl($scope, $modalInstance) {
    $scope.close = function () {
      $modalInstance.close();
    };
    $scope.$on('event:auth-logoutConfirmed', function () {
      $scope.close();
    });
  }

  function RefCodeModalCtrl($scope, $modal, ReferralService) {
    $scope.profile = {};
    $scope.openRefModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'home/_share-code-popup.html',
        controller: 'RefCodeModalInstanceCtrl',
        windowClass: 'share-code-modal'
      });

      $scope.$watch('displayTour', function () {
        if ($scope.displayTour) modalInstance.close();
      });

      ReferralService.closePopup();
    };

    $scope.$watch('profile', function () {
      if ($scope.profile.ref_code_popup_display) {
        $scope.openRefModal();
      }
    });
  }

  function RefCodeModalInstanceCtrl($scope, $modalInstance, $route, ReferralService) {
    $scope.data = {
      referral_code: '',
      error: ''
    };
    $scope.close = function () {
      $modalInstance.close();
    };
    $scope.$on('event:auth-logoutConfirmed', function () {
      $scope.close();
    });

    $scope.submitCode = function () {
      if ($scope.data.referral_code && $scope.data.referral_code.length > 0) {
        ReferralService.submitCode($scope.data).then(function () {
          $scope.close();
          $route.reload();
        }, function (response) {
          $scope.data.error = response.data.message;
        });
      }
    };

    $scope.keydownHandler = function (e) {
      if (e.keyCode === 13) {
        $scope.submitCode();
      }
    };
  }

  function SecretGiftCtrl($scope, $http, $modal, API) {
    var vm = this;
    vm.isOpen = false;
    vm.openGift = function (Profile) {
      $http.get(API + '/daily_gift/open_gift?platform=web&auth_token=' + Profile.auth_token)
        .success(function (data) {
          vm.isOpen = true;
          vm.type = Object.keys(data).filter(function (key) {
            return data[key] > 0;
          });
          vm.value = data[vm.type];

          vm.type == 'memocoin' ? $scope.profileDetail.virtual_money += vm.value : false;
        });
    };
    vm.openNativeInfoModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: 'SecretGiftModalCtrl',
        windowClass: 'buy-guide-popup-modal',
      });
    };
    vm.openClaimScholarModal = function (Profile) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: ['$scope', '$sce', '$modalInstance', function ($scope, $sce, $modalInstance) {
          $scope.trustedResource = $sce.trustAsResourceUrl(API +
            '/plaza_items/claim_gift_1m?platform=web&&localize=vi&quantity=1&base_item_id=gift_1m&auth_token=' +
            Profile.auth_token +
            '&verification_code=' + Profile.verification_code);
        }],
        windowClass: 'buy-guide-popup-modal',
      });
    };
  }

  function SecretGiftModalCtrl($scope, $sce, $modalInstance) {
    $scope.trustedResource = $sce.trustAsResourceUrl(
      '//staging.memo.edu.vn/native/web?disable_back_button=true');
  }

  function NativeCtrl($scope, $modal) {
    $scope.openNativeModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: 'SecretGiftModalCtrl',
        windowClass: 'buy-guide-popup-modal',
      });
    }
  }

  function PopupL0BCtrl($scope) {
  }

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$window', '$location', 'Profile', 'TreeBuilder',
      'AppSetting', 'MemoTracking', 'Message', 'ReferralService', 'Leaderboard', 'PopupServices', '$modal', HomeMainCtrl
    ])
    .controller('CampaignVerifyCodeCtrl', ['$scope', '$route', 'ReferralService', 'Profile',
      CampaignVerifyCodeCtrl
    ])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', 'ReferralService', PlacementTestModalCtrl])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance',
      PlacementTestModalInstanceCtrl
    ])
    .controller('RefCodeModalCtrl', ['$scope', '$modal', 'ReferralService', RefCodeModalCtrl])
    .controller('RefCodeModalInstanceCtrl', ['$scope', '$modalInstance', '$route', 'ReferralService',
      RefCodeModalInstanceCtrl
    ])
    .controller('SecretGiftCtrl', ['$scope', '$http', '$modal', 'API', SecretGiftCtrl])
    .controller('SecretGiftModalCtrl', ['$scope', '$sce', '$modalInstance', SecretGiftModalCtrl])
    .controller('NativeCtrl', ['$scope', '$modal', NativeCtrl])
    .controller('PopupL0BCtrl', ['$scope', PopupL0BCtrl]);

}(window.angular));