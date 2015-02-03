(function (angular) {
  'use strict';

  function WelcomePlazaCtrl($scope) {

  }

  function WelcomeMemoCoinCtrl($scope) {
    var ctrl = this;
    ctrl.coin = $scope.memoCoin;
  }

  angular.module('welcome.plaza', []);
  angular.module('welcome.plaza')
    .controller('WelcomePlazaCtrl', ['$scope', WelcomePlazaCtrl])
    .directive('welcomePlaza', function () {
      return {
        restrict: 'EA',
        controller: 'WelcomePlazaCtrl',
        controllerAs: 'plaza',
        templateUrl: 'welcome/plaza/_plaza.html'
      };
    })
    .controller('WelcomeMemoCoinCtrl', ['$scope', WelcomeMemoCoinCtrl])
    .directive('welcomeMemoCoin', function () {
      return {
        restrict: 'EA',
        scope: {
          memoCoin: "@"
        },
        replace: true,
        controller: 'WelcomeMemoCoinCtrl',
        controllerAs: 'welcomeMemoCoin',
        template: ['<span>', 'Bạn đang có {{welcomeMemoCoin.coin}} MemoCoin', '</span>'].join(
          '')
      };
    })
}(window.angular));