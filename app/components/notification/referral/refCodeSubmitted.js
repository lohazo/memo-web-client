(function (angular) {
  'use strict';

  function RefCodeSubmittedItem() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        content: '@',
        friend: '@',
        timeAgo: '='
      },
      templateUrl: 'components/notification/referral/_ref-code-submitted-item.html',
      controller: 'RefCodeSubmittedCtrl'
    };
  }

  function RefCodeSubmittedCtrl($scope) {
    var friend = angular.fromJson($scope.friend);
    $scope.message = $scope.content.replace('{username}', friend.username);
  }

  angular.module('notification.refCodeSubmitted', []);
  angular.module('notification.refCodeSubmitted')
    .controller('RefCodeSubmittedCtrl', ['$scope', RefCodeSubmittedCtrl]);
  angular.module('notification.refCodeSubmitted')
    .directive('notificationRefCodeSubmittedItem', RefCodeSubmittedItem);
}(window.angular));