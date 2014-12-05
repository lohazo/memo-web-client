(function(angular) {

  'use strict';

  function SettingLanguageService($http, $q, $localStorage) {
    var Setting = {};

    return Setting;
  }

  function SettingLanguageCtrl($scope, SettingLanguageService) {
  }

  angular.module('settings.languages', [])
    .controller('SettingLanguageCtrl', ['$scope', 'SettingLanguageService', SettingLanguageCtrl])
    .factory('SettingLanguageService', ['$http', '$q', '$localStorage', SettingLanguageService]);

})(window.angular);