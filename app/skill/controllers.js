(function (angular) {
  'use strict';

  function SkillCtrl($scope, $rootScope, $routeParams, AppSetting, Skill, User) {
    if (User && User.auth_token) {
      $scope.sharedSettings = {
        functionaly: {
          should_weakest_word: true,
          should_do_lesson: true,
          should_short_cut: true,
          should_grammar: true
        }
      }

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
      '$scope', '$rootScope', '$routeParams', 'AppSetting', 'Skill', 'User', SkillCtrl
    ]);
}(window.angular));