(function(angular) {
  'use strict';

  function SettingServices($http, $q, API_PHP) {
    var Services = {};

    Services.save = function(data) {
      var deferred = $q.defer();

      $http.post(API_PHP + '/users/edit_settings', data)
        .then(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    return Services;
  }

  function SettingNotification(SettingServices, $localStorage) {
    var Setting = {};

    Setting.settings = $localStorage.auth.profile_detail.settings;

    Setting.save = function(data) {
      data.auth_token = $localStorage.auth.user.auth_token;
      return SettingServices.save(data);
    };

    return Setting;
  }

  function SettingNotificationCtrl($scope, SettingNotification) {
    $scope.settings = SettingNotification.settings;

    $scope.saveChanges = function() {
      var data = {};
      data.setting = $scope.settings.map(function(userSetting) {
        userSetting.id = userSetting._id;
        delete userSetting._id;
        return userSetting;
      });
      data.setting = JSON.stringify($scope.settings);
      SettingNotification.save(data);
    };
  }

  angular.module('settings.notification', [])
    .factory('SettingServices', ['$http', '$q', 'API_PHP', SettingServices])
    .factory('SettingNotification', ['SettingServices', '$localStorage', SettingNotification])
    .controller('SettingNotificationCtrl', ['$scope', 'SettingNotification', SettingNotificationCtrl]);

})(window.angular);