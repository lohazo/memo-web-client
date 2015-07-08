(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $window, $location, Profile, TreeBuilder, AppSetting, MemoTracker,
    Message, ReferralService, Leaderboard, PopupServices, $modal, BannerServices) {
    $scope.leaderboardData = [];
 
    $scope.trackingBannerNative = function () {
      MemoTracker.track('skill tree plaza ad click');
    };
    $scope.trackingUdemy = function () {
      MemoTracker.track('skill tree udemy af click');
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

  function RefCodeModalCtrl($scope, $modal, ReferralService, AppSetting) {
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
      if ($scope.profile.ref_code_popup_display && AppSetting.sharedSettings.functionaly.should_referral) {
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
    vm.isOpen = 1;
    vm.openGift = function (Profile) {
      $http.get(API + '/daily_gift/open_gift?platform=web&auth_token=' + Profile.auth_token)
        .success(function (data) {
          vm.isOpen = 2;
          vm.type = Object.keys(data).filter(function (key) {
            return data[key] > 0;
          })[0];
          vm.value = data[vm.type];
          
          vm.type == 'memocoin' ? $scope.profileDetail.virtual_money += vm.value : false;
          vm.type == 'exp' ? $scope.profileDetail.total_exp += vm.value : false;

          if (vm.type == 'gift_1m') {
            $scope.profile.daily_gift_popup_display = false;
            vm.openGetScholarModal($scope, data);
            vm.isOpen = 0;
          }
        });
    };

    vm.openGetScholarModal = function (parentScope, data) {
      if (data.popup_enable) {
        var modalInstance = $modal.open({
          templateUrl: 'popup/_index.html',
          controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            $scope.popup = {
              popup_image: data.popup_image,
              last_button_url: data.last_button_url,
              last_button_text: 'Nhận học bổng ngay',
              first_button_text: 'Bỏ qua (nhận 5 Memocoin)'
            };
            $scope.closePopup = function () {
              parentScope.profileDetail.virtual_money += 5;
              $http.get(API + '/daily_gift/choose_other_gift?platform=web&auth_token=' + parentScope.profile
                .auth_token).success(function () {
                $modalInstance.dismiss();
              });
            };
            $scope.openPopup = function () {
              vm.openClaimScholarModal(parentScope.profile);
              $modalInstance.dismiss();
            };
          }],
          windowClass: 'popup-modal'
        });
      } else {
        vm.openClaimScholarModal(Profile);
      }
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

    vm.openTShirtInfoModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: 'SecretGiftTShirtModalCtrl',
        windowClass: 'buy-guide-popup-modal',
      });
    };

    vm.openClaimTShirtModal = function (Profile) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: ['$scope', '$sce', '$modalInstance', function ($scope, $sce, $modalInstance) {
          $scope.trustedResource = $sce.trustAsResourceUrl(API +
            '/plaza_items/claim_t_shirt?platform=web&&localize=vi&quantity=1&base_item_id=t_shirt&auth_token=' +
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

  function SecretGiftTShirtModalCtrl($scope, $sce, $modalInstance) {
    $scope.trustedResource = $sce.trustAsResourceUrl(
      '//services.memo.edu.vn/v2/api/plaza_items/buy_t_shirt?platform=web');
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

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$window', '$location', 'Profile', 'TreeBuilder',
      'AppSetting', 'MemoTracking', 'Message', 'ReferralService', 'Leaderboard', 'PopupServices', '$modal', 'BannerServices',
      HomeMainCtrl
    ])
    .controller('CampaignVerifyCodeCtrl', ['$scope', '$route', 'ReferralService', 'Profile',
      CampaignVerifyCodeCtrl
    ])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', 'AppSetting', 'ReferralService',
      PlacementTestModalCtrl
    ])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance', 'Profile',
      PlacementTestModalInstanceCtrl
    ])
    .controller('RefCodeModalCtrl', ['$scope', '$modal', 'ReferralService', 'AppSetting', RefCodeModalCtrl])
    .controller('RefCodeModalInstanceCtrl', ['$scope', '$modalInstance', '$route', 'ReferralService',
      RefCodeModalInstanceCtrl
    ])
    .controller('SecretGiftCtrl', ['$scope', '$http', '$modal', 'API', SecretGiftCtrl])
    .controller('SecretGiftModalCtrl', ['$scope', '$sce', '$modalInstance', SecretGiftModalCtrl])
    .controller('SecretGiftTShirtModalCtrl', ['$scope', '$sce', '$modalInstance', SecretGiftTShirtModalCtrl])
    .controller('NativeCtrl', ['$scope', '$modal', NativeCtrl]);

}(window.angular));