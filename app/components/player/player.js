(function (angular) {
  'use strict';

  function PlayerCtrl($scope) {
    $scope.sharedSettings = {
      functionaly: {
        should_weakest_word: true,
        should_forum:  true,
        should_jobs: true,
        should_profile: true
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