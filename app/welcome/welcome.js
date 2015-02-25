(function (angular) {

  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
      templateUrl: 'welcome/_index.html',
      controller: 'WelcomeCtrl',
      controllerAs: 'welcome',
      resolve: {
        welcomeData: function (Welcome) {
          return Welcome.start();
        }
      }
    });
  }

  function WelcomeCtrl($scope, Welcome) {
    var ctrl = this;
    ctrl.player = Welcome;
  }

  angular.module('welcome', ['app.services', 'welcome.services', 'welcome.player',
    'welcome.quitLink', 'welcome.questionScreen', 'welcome.claimBonusScreen', 'welcome.plaza',
    'welcome.finishScreen'
  ]).config([
    '$routeProvider',
    WelcomeConfig
  ]);
  angular.module('welcome')
    .controller('WelcomeCtrl', ['$scope', 'Welcome', WelcomeCtrl]);
}(window.angular));