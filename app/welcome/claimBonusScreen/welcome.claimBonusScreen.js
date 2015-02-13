(function (angular) {
  'use strict';

  function ClaimBonusScreenCtrl($scope) {
    var ctrl = this;
    ctrl.rewardIntro = $scope.playerData.exam.tutorial_memo_coin_bonus_message.replace(
      '5 MemoCoin', '<b>5</b> <b class="orange">MemoCoin</b>');
    ctrl.rewardAmount = $scope.playerData.exam.tutorial_memo_coin_bonus_amount;
    ctrl.rewardTooltip = $scope.playerData.exam.tutorial_memo_coin_bonus_tooltip.replace(
      'MemoCoin', '<b class="orange">MemoCoin</b>').replace('Plaza', '<a href="/plaza">Plaza</a>');
    ctrl.claimBonus = $scope.claimBonus;
  }

  angular.module('welcome.claimBonusScreen', []);
  angular.module('welcome.claimBonusScreen')
    .controller('ClaimBonusScreenCtrl', ['$scope', ClaimBonusScreenCtrl])
    .directive('claimBonusScreen', function () {
      return {
        restrict: 'EA',
        scope: {
          playerData: '=',
          claimBonus: '&'
        },
        controller: 'ClaimBonusScreenCtrl',
        controllerAs: 'claimBonusScreen',
        templateUrl: 'welcome/claimBonusScreen/_claim-bonus-screen.html'
      };
    });
}(window.angular));