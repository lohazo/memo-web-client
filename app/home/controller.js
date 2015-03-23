(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $location, Profile, TreeBuilder, AppSetting,
    MemoTracker,
    Message, ReferralService) {
    function getProfile() {
      $scope.profile = Profile.user;
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
      Profile.getProfileDetail()
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

    // Chain calls
    Profile.getProfile()
      .then(getProfile)
      .then(Message.list)
      .then(getProfileDetail)
      .then(getStatus)
      .then(AppSetting.getSharedSettings)
      .then(TreeBuilder.getIconSets)
      .then(buildTree)
      .then(takeATour)
      .then(AppSetting.getWords);
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

      // ReferralService.closePopup();
    };

    $scope.$watch('profile', function() {
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
        ReferralService.submitCode($scope.data).then(function() {
          $scope.close();
          $route.reload();
        }, function(response) {
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

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$location', 'Profile', 'TreeBuilder',
      'AppSetting', 'MemoTracking', 'Message', 'ReferralService', HomeMainCtrl
    ])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', 'ReferralService', PlacementTestModalCtrl])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance',
      PlacementTestModalInstanceCtrl
    ])
    .controller('RefCodeModalCtrl', ['$scope', '$modal', 'ReferralService', RefCodeModalCtrl])
    .controller('RefCodeModalInstanceCtrl', ['$scope', '$modalInstance', '$route', 'ReferralService', RefCodeModalInstanceCtrl]);

}(window.angular));