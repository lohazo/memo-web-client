(function (angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService, $modal) {
        $scope.getActiveItem = function (path) {
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
          },
          // {'title': 'Thảo luận', 'link': '/discussion'}
        ];

        $scope.showShortcutPopup = function() {
          var modalInstance = $modal.open({
            templateUrl: 'components/header/_keyboard.html',
              // controller: 'LoginModalInstanceCtrl',
              windowClass: 'box-shortcuts"'
            });

          modalInstance.result.then(function(msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        };

  }


  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', [
    '$rootScope', '$scope', '$location', 'AuthService', '$modal', HeaderCtrl]);
}(window.angular));