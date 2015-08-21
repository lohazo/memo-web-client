(function (angular) {
  'use strict';

  function HeaderCtrl($scope, $rootScope, $location, AuthService, $modal, MemoTracking, AppSetting, $localStorage, badgeServices) {
    badgeServices.getTotalBadge().success(function (data){
      $scope.total_badge_notice = data.total;
    });
    $scope.sharedSettings = {
      functionaly: {
        should_weakest_word: true,
        should_forum:  true,
        should_jobs: true,
        should_profile: true
      }
    };

    $scope.$on('event-sharedSettingsLoaded', function () {
      $scope.sharedSettings = AppSetting.sharedSettings;
    });

    if (!$localStorage.auth) {
      $scope.user_avatar = '/img/avatar1.jpg';
    } else {
      $scope.$on('get-profile', function () {
        $scope.user_avatar = $localStorage.auth.profile_detail.url_avatar;
      });
    }

    if ($localStorage.auth) {
      $scope.$on('get-profile', function () {
        $scope.enable_badge = $localStorage.auth.profile_detail.enable_badge;
      });
    }

    $scope.$on('$routeChangeSuccess', function () {
      $scope.path = $location.path();
    });
    
    $scope.trackingClickJobs = function () {
      MemoTracking.track('jobs');
    };

    $scope.$on('event-sharedSettingsLoaded', function () {
      $scope.sharedSettings = AppSetting.sharedSettings;
    });

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
  angular.module('header').controller('HeaderCtrl', ['$scope', '$rootScope', '$location', 'AuthService', '$modal', 'MemoTracking', 'AppSetting', '$localStorage', 'badgeServices',
    HeaderCtrl
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

}(window.angular));