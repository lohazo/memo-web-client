(function (angular) {
  'use strict';

  function PlayerCtrl($scope) {
    $scope.sharedSettings = {
      functionaly: {
        should_forum:  true
      }
    };

    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    });

    $scope.$on('event-sharedSettingsLoaded', function () {
      $scope.sharedSettings = AppSetting.sharedSettings;
    });
  }

  angular.module('player', []);
  angular.module('player').controller('PlayerCtrl', ['$scope', PlayerCtrl]);
}(window.angular));