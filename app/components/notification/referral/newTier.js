(function (angular) {
  'use strict';

  function NotificationNewTier() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: '@',
        gift: "@"
      },
      templateUrl: 'components/notification/referral/_new-tier-item.html',
      controller: 'AchieveNewTierCtrl'
    };
  }

  function AchieveNewTierCtrl($scope) {
    var gift = angular.fromJson($scope.gift);
    $scope.message = $scope.content.replace('{new_gift_value}', gift.new_gift_value);
  }

  angular.module('notification.newTier', []);
  angular.module('notification.newTier')
    .controller('AchieveNewTierCtrl', ['$scope', AchieveNewTierCtrl]);
  angular.module('notification.newTier')
    .directive('notificationNewTier', NotificationNewTier);
}(window.angular));