(function (angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService, $modal, MemoTracking) {
    $scope.$on('$routeChangeSuccess', function () {
      $scope.path = $location.path();
    });
    
    $scope.trackingClickJobs = function () {
      MemoTracking.track('jobs');
    };

    $scope.logout = function () {
      AuthService.logout();
    };

    $scope.showShortcutPopup = function () {
      var modalInstance = $modal.open({
        templateUrl: 'components/header/_keyboard.html',
        controller: 'ModalInstanceCtrl',
        windowClass: 'box-shortcuts"'
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };
  }

  angular.module('header', []);
  angular.module('header').controller('HeaderCtrl', ['$rootScope', '$scope', '$location', 'AuthService', '$modal', 'MemoTracking',
      HeaderCtrl
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

}(window.angular));