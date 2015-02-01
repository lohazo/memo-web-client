(function (angular) {
  'use strict';

  function ExamConfig($routeProvider) {
    $routeProvider.when('/checkpoint/:checkpoint_position', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
    $routeProvider.when('/shortcut/:id', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
    $routeProvider.when('/skill/:id/:lesson_number', {
      templateUrl: 'exam/_index.html',
      controller: 'ExamCtrl'
    });
    $routeProvider.when('/placement/:id', {
      templateUrl: 'exam/_placement-test.html',
      controller: 'PlacementTestCtrl'
    });
  }

  angular.module('exam', ['exam.controllers', 'exam.services', 'placement.controllers',
      'placement.services', 'placement.directives',
    ])
    .config(['$routeProvider', ExamConfig]);
}(window.angular));