(function (angular) {
  'use strict';

  function ClaimBonusScreenCtrl($scope) {

  }

  angular.module('welcome.claimBonusScreen', []);
  angular.module('welcome.claimBonusScreen')
    .controller('ClaimBonusScreenCtrl', ['$scope', ClaimBonusScreenCtrl])
    .directive('claimBonusScreen', function () {
      return {
        restrict: 'EA',
        controller: 'ClaimBonusScreenCtrl',
        templateUrl: 'welcome/claimBonusScreen/_claim-bonus-screen.html'
      };
    });
}(window.angular));