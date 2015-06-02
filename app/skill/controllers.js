(function (angular) {
  'use strict';

  function SkillCtrl($scope, $rootScope, $routeParams, AppSetting, Skill, User, $translate, $localStorage) {
    if (User && User.auth_token) {
      AppSetting.getSharedSettings().then(function () {
        $scope.sharedSettings = AppSetting.shared_settings;
        $rootScope.$broadcast('event-sharedSettingsLoaded');
      });

      $translate.use($localStorage.auth.user.display_lang);

      $scope.sharedSettings = {
        functionaly: {
          should_weakest_word: true,
        }
      };

      $scope.$on('event-sharedSettingsLoaded', function () {
        $scope.sharedSettings = AppSetting.sharedSettings;
      });

      $scope.iconSets = AppSetting.sharedSettings.web_skill_base_icon_urls;
      $scope.skill = Skill.skill($routeParams.id);
      $scope.showGrammar = $routeParams.id;
    } else {
      $rootScope.$broadcast('event:auth-logoutConfirmed');
    }
  }

  angular.module('skill.controllers', [])
    .controller('SkillCtrl', [
      '$scope', '$rootScope', '$routeParams', 'AppSetting', 'Skill', 'User', '$translate', '$localStorage', SkillCtrl
    ]);
}(window.angular));