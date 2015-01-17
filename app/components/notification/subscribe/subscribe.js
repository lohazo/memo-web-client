(function (angular) {
  'use strict';

  function NotificationSubscribeItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: "@notiId",
        content: "@",
        friend: "=",
        timeAgo: "="
      },
      templateUrl: 'components/notification/subscribe/_subscribe-item.html',
      controller: 'NotificationSubscribeCtrl'
    };
  }

  function NotificationSubscribeCtrl($scope, $localStorage, LeaderboardServices,
    NotificationService) {
    var ctrl = this;
    $scope.message = $scope.content.replace(/\{username\}/g, $scope.friend.username);

    $scope.follow = function () {
      LeaderboardServices.follow({
          friend_id: $scope.friend._id
        })
        .then(function (response) {
          $localStorage.auth.profile_detail.following_user_ids = response.data.following_user_ids;
          $scope.friend.is_friend = true;
        })
        .then(ctrl.open);
    };

    ctrl.open = function () {
      NotificationService.open({
        'id': $scope.id,
        'is_friend': true
      });
    };
  }

  angular.module('notification.subscribe', []);
  angular.module('notification.subscribe')
    .directive('notificationSubscribeItem', NotificationSubscribeItem);
  angular.module('notification.subscribe')
    .controller('NotificationSubscribeCtrl', ['$scope', '$localStorage', 'LeaderboardServices',
      'NotificationService', NotificationSubscribeCtrl
    ]);
}(window.angular));