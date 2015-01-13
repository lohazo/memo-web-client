(function (angular) {
  'use strict';

  function NotificationSubscribeItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: "@",
        friend: "="
      },
      templateUrl: 'components/notification/subscribe/_subscribe-item.html',
      controller: 'NotificationSubscribeCtrl'
    };
  }

  function NotificationSubscribeCtrl($scope) {
    $scope.content = $scope.content.replace('{username}', $scope.friend.username);
    $scope.notification = {
      friend: $scope.friend,
      content: $scope.content
    };
  }

  angular.module('notification.subscribe', []);
  angular.module('notification.subscribe')
    .directive('notificationSubscribeItem', NotificationSubscribeItem);
  angular.module('notification.subscribe')
    .controller('NotificationSubscribeCtrl', ['$scope', NotificationSubscribeCtrl]);
}(window.angular));