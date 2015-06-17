(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $window, $location, Profile, TreeBuilder, AppSetting, MemoTracker,
    Message, ReferralService, Leaderboard, PopupServices, $modal) {
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
      finished_lesson: 0,
      strength_gap: 0,
      icon_url: 'https://lh3.googleusercontent.com/-UFh1SmnNPgI/VYHPcAqlUTI/AAAAAAACDxc/SO0NJal0Rrc/s0/island-5-icon.png'
    }]
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

  function PopupL0BCtrl($scope, dataPopup, PopupServices, MemoTracking, $modalInstance) {
    $scope.popup = dataPopup;

    $scope.openPopup = function () {
      MemoTracking.track(dataPopup.type);
      PopupServices.openPopup(dataPopup).success(function () {
        $modalInstance.close('openClaimScholarModal');
      });
    };

    $scope.closePopup = function () {
      $modalInstance.close();
    }
  }

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$window', '$location', 'Profile', 'TreeBuilder',
      'AppSetting', 'MemoTracking', 'Message', 'ReferralService', 'Leaderboard', 'PopupServices', '$modal',
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
    .controller('NativeCtrl', ['$scope', '$modal', NativeCtrl])
    .controller('PopupL0BCtrl', ['$scope', 'dataPopup', 'PopupServices', 'MemoTracking',
      '$modalInstance',
      PopupL0BCtrl
    ]);

}(window.angular));