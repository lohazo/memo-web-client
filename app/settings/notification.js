(function (angular) {
  'use strict';

  function SettingServices($http, $q, $localStorage, API) {
    var Services = {};

    Services.save = function (data) {
      var deferred = $q.defer();
      var userId = $localStorage.auth.user._id;

      $http.put(API + '/users/' + userId + '/notification_settings', data)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function SettingNotification(SettingServices, $localStorage) {
    var Setting = {};

    Setting.settings = $localStorage.auth.profile_detail.settings;

    Setting.save = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;
      return SettingServices.save(data);
    };

    return Setting;
  }

  function SettingNotificationCtrl($scope, SettingNotification, $translate, AppSetting, $rootScope, $localStorage) {
    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    });

    $translate.use($localStorage.auth.user.display_lang);
    
    $scope.settings = SettingNotification.settings;

    $scope.saveChanges = function () {
      var data = {};
      data.setting = $scope.settings.map(function (userSetting) {
        userSetting.id = userSetting._id;
        //delete userSetting._id;
        return userSetting._id;
      });
      data.setting = JSON.stringify($scope.settings);
      SettingNotification.save(data);
    };
  }

  angular.module('settings.notification', [])
    .factory('SettingServices', ['$http', '$q', '$localStorage', 'API', SettingServices])
    .factory('SettingNotification', ['SettingServices', '$localStorage', SettingNotification])
    .controller('SettingNotificationCtrl', ['$scope', 'SettingNotification', '$translate', 'AppSetting', '$rootScope', '$localStorage',
      SettingNotificationCtrl
    ]);

})(window.angular);