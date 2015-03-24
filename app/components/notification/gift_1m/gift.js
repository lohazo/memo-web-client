(function (angular) {
  'use strict';

  function NotificationGiftItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: '@notiId',
        metadata: '=',
        content: '@',
        timeAgo: '='
      },
      templateUrl: 'components/notification/gift_1m/_gift-1m-item.html',
      controller: 'NotificationGiftItemCtrl'
    };
  }

  function NotificationGiftItemCtrl($scope) {

  }

  angular.module('notification.gift', [])
    .directive('notificationGiftItem', NotificationGiftItem)
    .controller('NotificationGiftItemCtrl', ['$scope', NotificationGiftItemCtrl]);
}(window.angular));