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
      templateUrl: 'components/notification/t_shirt_apr/t_shirt_apr-item.html',
      controller: 'NotificationGiftItemCtrl'
    };
  }

  function NotificationGiftItemCtrl($scope) {

  }

  angular.module('notification.gift', [])
    .directive('notificationGiftItem', NotificationGiftItem)
    .controller('NotificationGiftItemCtrl', ['$scope', NotificationGiftItemCtrl]);
}(window.angular));