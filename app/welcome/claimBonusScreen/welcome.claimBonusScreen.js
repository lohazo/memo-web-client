(function (angular) {
  'use strict';

  function ClaimBonusScreenCtrl($scope) {
    var ctrl = this;
    ctrl.claimBonus = $scope.claimBonus;
  }

  angular.module('welcome.claimBonusScreen', []);
  angular.module('welcome.claimBonusScreen')
    .controller('ClaimBonusScreenCtrl', ['$scope', ClaimBonusScreenCtrl])
    .directive('claimBonusScreen', function () {
      return {
        restrict: 'EA',
        scope: {
          claimBonus: '&'
        },
        controller: 'ClaimBonusScreenCtrl',
        controllerAs: 'claimBonusScreen',
        templateUrl: 'welcome/claimBonusScreen/_claim-bonus-screen.html'
      };
    });
}(window.angular));