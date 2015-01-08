(function(angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService) {
    $scope.getActiveItem = function(path) {
      if ('/' + $location.path().split('/')[0] === path) {
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
      },
      // {'title': 'Thảo luận', 'link': '/discussion'}
    ];
  }

  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', [
    '$rootScope', '$scope', '$location', 'AuthService', HeaderCtrl
  ]);
}(window.angular));