(function(angular) {
  'use strict';

  function NotificationService($http, $q, $localStorage, API) {
    var Service = {};

    Service.getInAppNotifications = function(data) {
      // data = {page: 1};
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      $http.get(API + '/in_app_notifications?auth_token=' + authToken + '&page=' + (data.page || 1), {
          ignoreLoadingBar: true
        })
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
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
        .then(function(response) {
          $scope.notification = response.data;
        })
    }

    getInAppNotifications();
    // $interval(getInAppNotifications, 30 * 1000);
  }

  function NotificationDropdownCtrl($scope, NotificationService) {
    // $scope.watch('notification', function() {
    //   console.log($scope.notification);
    // });
  }

  function NotificationDropdownButton($timeout, $rootScope) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'NotificationDropdownButtonCtrl',
      templateUrl: 'components/notification/_notification-button.html'
    };
  }

  function NotificationDropdown() {
    return {
      restrict: 'EA',
      controller: 'NotificationDropdownCtrl'
    };
  }

  angular.module('notification', []);
  angular.module('notification')
    .factory('NotificationService', ['$http', '$q', '$localStorage', 'API', NotificationService])
    .controller('NotificationDropdownButtonCtrl', ['$scope', '$interval', 'NotificationService',
      NotificationDropdownButtonCtrl
    ])
    .controller('NotificationDropdownCtrl', ['$scope', 'NotificationService',
      NotificationDropdownCtrl
    ])
    .directive('notificationDropdownButton', NotificationDropdownButton)
    .directive('notificationDropdown', [NotificationDropdown]);
}(window.angular));