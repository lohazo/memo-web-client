(function (angular) {
  'use strict';

  function NotificationService($http, $q, $localStorage, API, $location) {
    var Service = {};
    var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

    Service.getInAppNotifications = function (data) {
      // data = {page: 1};
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      $http.get(API + '/in_app_notifications?platform=web&localize=' + localize + '&auth_token=' + authToken + '&page=' + (data.page ||
          1), {
          ignoreLoadingBar: true
        })
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    Service.checkAll = function () {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.post(API + '/in_app_notifications/check_all?platform=web&localize=' + localize, {
          auth_token: authToken
        }, {
          ignoreLoadingBar: true
        })
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    Service.open = function (data) {
      // data = {id:, [is_friend]}
      var deferred = $q.defer();
      data.auth_token = $localStorage.auth.user.auth_token;

      $http.post(API + '/in_app_notifications/open?platform=web&localize=' + localize, data)
        .then(function (response) {
          deferred.resolve(response);
        })
        .then(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    return Service;
  }

  function NotificationDropdownButtonCtrl($scope, $interval, NotificationService, MemoTracker) {
    $scope.notification = {};

    function getInAppNotifications() {
      NotificationService.getInAppNotifications({
          page: 1
        })
        .then(function (response) {
          $scope.notification = response.data;
        });
    }

    $scope.checkAll = function () {
      $scope.notification.is_new_count = 0;
      NotificationService.checkAll().then(function () {
        $scope.notification.notifications.forEach(function (item) {
          if (item.is_new) MemoTracker.track(item.type + ' noti read');
        });
      });
    };
    getInAppNotifications();
    // $interval(getInAppNotifications, 30 * 1000);
  }

  function NotificationDropdownItemCtrl($scope, NotificationService) {}

  function NotificationDropdownButton($timeout, $rootScope) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'NotificationDropdownButtonCtrl',
      link: function ($scope, $element) {
        angular.element($element).find('a').bind('click', function () {
          $scope.checkAll();
          $scope.$apply();
        });
      },
      templateUrl: 'components/notification/_notification-button.html'
    };
  }

  function NotificationDropdownItem() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'NotificationDropdownItemCtrl',
      link: function ($scope, $element, $attr) {},
      templateUrl: 'components/notification/_notification-dropdown-item.html'
    };
  }

  angular.module('notification', [
    'notification.subscribe',
    'notification.pass',
    'notification.newTier',
    'notification.refCodeSubmitted',
    'notification.eventAlert',
    'notification.gift'
  ]);
  angular.module('notification')
    .factory('NotificationService', ['$http', '$q', '$localStorage', 'API', '$location', NotificationService])
    .controller('NotificationDropdownButtonCtrl', ['$scope', '$interval', 'NotificationService', 'MemoTracking',
      NotificationDropdownButtonCtrl
    ])
    .controller('NotificationDropdownItemCtrl', ['$scope', 'NotificationService',
      NotificationDropdownItemCtrl
    ])
    .directive('notificationDropdownButton', NotificationDropdownButton)
    .directive('notificationDropdownItem', [NotificationDropdownItem]);
}(window.angular));