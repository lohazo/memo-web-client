(function (angular) {

  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
      templateUrl: 'welcome/_index.html',
      controller: 'WelcomeCtrl',
      resolve: {
        welcomeData: function (Welcome) {
          return Welcome.start();
        }
      }
    });
  }

  function WelcomeCtrl($scope) {

  }

  angular.module('welcome', ['app.services', 'welcome.services', 'welcome.quitLink',
    'welcome.questionScreen', 'welcome.claimBonusScreen', 'welcome.plaza'
  ]).config([
    '$routeProvider',
    WelcomeConfig
  ]);
  angular.module('welcome')
    .controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
}(window.angular));