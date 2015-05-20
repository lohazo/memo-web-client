(function (angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService, $modal, MemoTracking, AppSetting) {
    $scope.$on('getSharedSettings', function(){
      if (AppSetting.sharedSettings.functionaly) {
        $scope.should_weakest_word =  AppSetting.sharedSettings.functionaly.should_weakest_word;
        $scope.should_forum = AppSetting.sharedSettings.functionaly.should_forum;
        $scope.should_jobs = AppSetting.sharedSettings.functionaly.should_jobs;
        $scope.should_profile = AppSetting.sharedSettings.functionaly.should_profile;
      } else {
        $scope.should_weakest_word =  true;
        $scope.should_forum = true;
        $scope.should_jobs = true;
        $scope.should_profile = true;
      };
    });

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
  angular.module('header').controller('HeaderCtrl', ['$rootScope', '$scope', '$location', 'AuthService', '$modal', 'MemoTracking', 'AppSetting',
      HeaderCtrl
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

}(window.angular));