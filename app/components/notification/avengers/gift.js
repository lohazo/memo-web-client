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
      templateUrl: 'components/notification/avengers/_avengers.html',
      controller: 'NotificationGiftItemCtrl'
    };
  }

  function NotificationGiftItemCtrl($scope) {

  }

  angular.module('notification.gift', [])
    .directive('notificationGiftItem', NotificationGiftItem)
    .controller('NotificationGiftItemCtrl', ['$scope', NotificationGiftItemCtrl]);
}(window.angular));