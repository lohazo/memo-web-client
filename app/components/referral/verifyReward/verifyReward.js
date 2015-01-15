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
    $scope.rewards_info = data;
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