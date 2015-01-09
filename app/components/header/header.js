(function(angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService) {
    $scope.$on('$routeChangeSuccess', function() {
      $scope.path = $location.path();
    });

    $scope.logout = function() {
      AuthService.logout();
    };

    $scope.menus = [{
      'title': 'Trang chủ',
      'link': '/'
    }, {
      'title': 'Học bổng đón xuân',
      'link': '/referral'
    }];
  }

  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', [
    '$rootScope', '$scope', '$location', 'AuthService', HeaderCtrl
  ]);
}(window.angular));