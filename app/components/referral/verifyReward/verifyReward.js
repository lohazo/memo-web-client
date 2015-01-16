(function (angular) {
  'use strict';

  function VerifyRewardModalCtrl($scope, $modal, ReferralService) {
    $scope.verifyRewards = function () {
      ReferralService.verifyRewards().then(function (res) {
        (function () {
          var modalInstance = $modal.open({
            // template: '<div verifyRewards-modal></div>',
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      }, function (res) {
        (function () {
          var modalInstance = $modal.open({
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards_Error.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function () {
                return res.data.message;
              }
            }
          });

          modalInstance.result.then(function (msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      });
    };
  }

  function ReferralRewardsCtrl($scope, data, modalInstance) {
    var ctrl = this;
    $scope.rewards_info = data;
    $scope.user = {
      mobile: ''
    };

    ctrl.validateMobile = function (mobile) {
      // Regex 10-digit phone
      var tenDigitPhoneRegex = /09[0-9]{8}/;
      // Regex 11-digit phone
      var elevenDigitPhoneRegex = /01[0-9]{9}/;
      return (mobile.match(tenDigitPhoneRegex) || mobile.match(elevenDigitPhoneRegex));
    }

    $scope.verifyMobile = function () {

    };

    $scope.close = function () {
      modalInstance.close();
    };
  }

  angular.module('referral.verifyReward', [])
    .controller('VerifyRewardModalCtrl', ['$scope', '$modal', 'ReferralService',
      VerifyRewardModalCtrl
    ])
    .controller('ReferralRewardsCtrl', ['$scope', 'getRewardsCode', '$modalInstance',
      ReferralRewardsCtrl
    ]);
}(window.angular));