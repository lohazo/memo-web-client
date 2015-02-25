(function (angular) {
  'use strict';

  function SkillCtrl($scope, $rootScope, $routeParams, AppSetting, Skill, User) {
    if (User && User.auth_token) {
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