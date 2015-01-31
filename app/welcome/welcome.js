(function (angular) {

  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
      templateUrl: 'welcome/_index.html',
      controller: 'WelcomeCtrl'
    });
  }

  function WelcomeCtrl($scope) {

  }

  angular.module('welcome', ['app.services', 'welcome.quitLink']).config(['$routeProvider',
    WelcomeConfig
  ]);
  angular.module('welcome')
    .controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
}(window.angular));