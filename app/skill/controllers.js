(function (angular) {
  'use strict';

  function SkillCtrl($scope, $rootScope, $routeParams, AppSetting, Skill, User) {
    if (User && User.auth_token) {
      if (AppSetting.sharedSettings) {
        $scope.should_weakest_word = AppSetting.sharedSettings.functionaly.should_weakest_word;
        $scope.should_do_lesson = AppSetting.sharedSettings.functionaly.should_do_lesson;
        $scope.should_short_cut = AppSetting.sharedSettings.functionaly.should_short_cut;
        $scope.should_grammar = AppSetting.sharedSettings.functionaly.should_grammar;
      } else {
        $scope.should_weakest_word = false;
        $scope.should_do_lesson = false;
        $scope.should_short_cut = false;
        $scope.should_grammar = false;
      };
      
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