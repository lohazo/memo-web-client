(function (angular) {
  'use strict';

  function StrengthenConfig($routeProvider) {
    $routeProvider.when('/practice', {
      templateUrl: 'exam/strengthen/_index.html',
      controller: 'CoursePracticeCtrl'
    });
    $routeProvider.when('/skill/:skill_id/practice', {
      templateUrl: 'exam/strengthen/_index.html',
      controller: 'SkillPracticeCtrl'
    });
  }

  angular.module('exam.strengthen', [])
    .config(['$routeProvider', StrengthenConfig])
    .directive('questionSuccessStrengthen', function () {
      return {
        scope: 'EA',
        replace: true,
        templateUrl: 'exam/strengthen/_question-success.html'
      };
    });
}(window.angular));