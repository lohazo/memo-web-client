(function(angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService) {
    $scope.getActiveItem = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active";
      } else {
        return "";
      }
    };
    $scope.logout = function() {
      AuthService.logout();
    };
    $scope.menus = [{
        'title': 'Trang chủ',
        'link': '/'
      }, {
        'title': 'Học bổng đón xuân',
        'link': '/referral'
      }
      // {'title': 'Thảo luận', 'link': '/discussion'}
    ];
  }

  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', [
    '$rootScope', '$scope', '$location', 'AuthService', HeaderCtrl
  ]);
}(window.angular));