(function (angular) {
  'use strict';

  function RefCodeSubmittedItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: '@notiId',
        content: '@',
        friend: '=',
        timeAgo: '='
      },
      templateUrl: 'components/notification/referral/_ref-code-submitted-item.html',
      controller: 'RefCodeSubmittedCtrl'
    };
  }

  function RefCodeSubmittedCtrl($scope, $localStorage, LeaderboardServices, NotificationService) {
    var ctrl = this;
    var friend = angular.fromJson($scope.friend);
    $scope.message = $scope.content.replace(/\{username\}/g, friend.username);

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

  angular.module('notification.refCodeSubmitted', []);
  angular.module('notification.refCodeSubmitted')
    .controller('RefCodeSubmittedCtrl', ['$scope', '$localStorage', 'LeaderboardServices',
      'NotificationService',
      RefCodeSubmittedCtrl
    ]);
  angular.module('notification.refCodeSubmitted')
    .directive('notificationRefCodeSubmittedItem', RefCodeSubmittedItem);
}(window.angular));