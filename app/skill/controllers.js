'use strict';

angular.module('skill.controllers', [])
  .controller('SkillCtrl', [
    '$scope', '$rootScope', '$location', '$localStorage', '$routeParams',
    'AuthService', 'Skill', 'MemoTracking',
    function($scope, $rootScope, $location, $localStorage, $routeParams,
      AuthService, Skill, MemoTracker) {

      $scope.iconSets = $localStorage.appSharedSettings.base_skill_icon_urls;
      $scope.skill = Skill.skill($routeParams.id);
      MemoTracker.track('lessons list');
      $scope.showGrammar = ($routeParams.id);
    }
  ]);