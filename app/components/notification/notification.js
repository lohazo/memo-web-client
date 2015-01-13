(function (angular) {
  'use strict';

  function NotificationService($http, $q, $localStorage, API) {
    var Service = {};

    Service.getInAppNotifications = function (data) {
      // data = {page: 1};
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      $http.get(API + '/in_app_notifications?auth_token=' + authToken + '&page=' + (data.page ||
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

      $http.post(API + '/in_app_notifications/check_all', {
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
    return Service;
  }

  function NotificationDropdownButtonCtrl($scope, $interval, NotificationService) {
    $scope.notification = {};

    function getInAppNotifications() {
      NotificationService.getInAppNotifications({
          page: 1
        })
        .then(function (response) {
          // $scope.notification = response.data;
          $scope.notification = {
            "is_new_count": 4,
            "notifications": [{
              "_id": "54b4eaca53616c28f7030000",
              "type": "someone_subscribe",
              "content": "{username} đã thêm bạn vào danh sách bạn bè.",
              "is_new": true,
              "is_read": false,
              "is_opened": false,
              "time_ago": "5 seconds ago",
              "metadata": {
                "friend": {
                  "_id": "54b4c67d8a8fdbbe230041a7",
                  "username": "Sald11221",
                  "url_avatar": "",
                  "is_friend": true
                }
              }
            }, {
              "_id": "54b4e7c453616c28f7020000",
              "type": "someone_subscribe",
              "content": "{username} đã thêm bạn vào danh sách bạn bè.",
              "is_new": true,
              "is_read": false,
              "is_opened": false,
              "time_ago": "12 minutes and 59 seconds ago",
              "metadata": {
                "friend": {
                  "_id": "54b4c67d8a8fdbbe230041a7",
                  "username": "Sald11221",
                  "url_avatar": "",
                  "is_friend": false
                }
              }
            }, {
              "_id": "54b4e7c453616c28f7010000",
              "type": "someone_subscribe",
              "content": "{username} đã thêm bạn vào danh sách bạn bè.",
              "is_new": true,
              "is_read": false,
              "is_opened": false,
              "time_ago": "12 minutes and 59 seconds ago",
              "metadata": {
                "friend": {
                  "_id": "54b4c67d8a8fdbbe230041a7",
                  "username": "Sald11221",
                  "url_avatar": "",
                  "is_friend": false
                }
              }
            }, {
              "_id": "54b4e78b53616c28f7000000",
              "type": "someone_subscribe",
              "content": "{username} đã thêm bạn vào danh sách bạn bè.",
              "is_new": true,
              "is_read": false,
              "is_opened": false,
              "time_ago": "13 minutes and 56 seconds ago",
              "metadata": {
                "friend": {
                  "_id": "54b4c67d8a8fdbbe230041a7",
                  "username": "Sald11221",
                  "url_avatar": "",
                  "is_friend": false
                }
              }
            }, {
              "_id": "54b11b7f6d616928fc390300",
              "type": "achieved_new_tier",
              "content": "Mức học bổng tích lũy của bạn đã tăng lên 500",
              "is_new": false,
              "is_read": false,
              "is_opened": false,
              "time_ago": "2 days and 21 hours ago",
              "metadata": {
                "old_gift_value": 0,
                "new_gift_value": 500
              }
            }],
            "next_page": 2
          };
        })
    }

    $scope.checkAll = function () {
      $scope.notification.is_new_count = 0;
      NotificationService.checkAll();
    };
    getInAppNotifications();
    // $interval(getInAppNotifications, 30 * 1000);
  }

  function NotificationDropdownItemCtrl($scope, NotificationService) {

  }

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
    'notification.subscribe'
  ]);
  angular.module('notification')
    .factory('NotificationService', ['$http', '$q', '$localStorage', 'API', NotificationService])
    .controller('NotificationDropdownButtonCtrl', ['$scope', '$interval', 'NotificationService',
      NotificationDropdownButtonCtrl
    ])
    .controller('NotificationDropdownItemCtrl', ['$scope', 'NotificationService',
      NotificationDropdownItemCtrl
    ])
    .directive('notificationDropdownButton', NotificationDropdownButton)
    .directive('notificationDropdownItem', [NotificationDropdownItem]);
}(window.angular));