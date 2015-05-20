(function (angular) {
  'use strict';

  function SkillCtrl($scope, $rootScope, $routeParams, AppSetting, Skill, User) {
    if (User && User.auth_token) {
      if (AppSetting.sharedSettings.functionaly) {
        $scope.should_weakest_word = AppSetting.sharedSettings.functionaly.should_weakest_word;
        $scope.should_do_lesson = AppSetting.sharedSettings.functionaly.should_do_lesson;
        $scope.should_short_cut = AppSetting.sharedSettings.functionaly.should_short_cut;
        $scope.should_grammar = AppSetting.sharedSettings.functionaly.should_grammar;
      } else {
        $scope.should_weakest_word =  true;
        $scope.should_do_lesson = true;
        $scope.should_short_cut = true;
        $scope.should_grammar = true;
      };
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