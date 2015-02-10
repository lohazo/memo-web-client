(function (angular) {
  'use strict';

  function WelcomePlazaCtrl($scope, Plaza) {
    $scope.powerUpSectionFilter = function (item) {
      return (["power-ups", "practice"].indexOf(item.section) >= 0);
    };

    $scope.specialSectionFilter = function (item) {
      return (["special"].indexOf(item.section) >= 0);
    };

    Plaza.get().then(function (response) {
      $scope.plaza = Plaza.data;
    });

    $scope.buy = function (itemId) {
      Plaza.buy({
        base_item_id: itemId,
        quantity: 1
      }).then(function (response) {
        $scope.plaza = Plaza.data;
      });
    };
  }

  function WelcomeMemoCoinCtrl($scope) {
    var ctrl = this;
    ctrl.coin = $scope.memoCoin;
  }

  angular.module('welcome.plaza', []);
  angular.module('welcome.plaza')
    .controller('WelcomePlazaCtrl', ['$scope', 'Plaza', WelcomePlazaCtrl])
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
          memoCoin: "@",
          hide: "="
        },
        replace: true,
        controller: 'WelcomeMemoCoinCtrl',
        controllerAs: 'welcomeMemoCoin',
        template: [
          '<span ng-class="{\'hide\': hide}" style="line-height:80px;vertical-align:middle">',
          'Bạn đang có {{welcomeMemoCoin.coin}} MemoCoin', '</span>'
        ].join('')
      };
    });
}(window.angular));