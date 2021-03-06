(function (angular) {
  'use strict';

  function WelcomePlazaCtrl($scope, Plaza, $location, Profile, $modal) {
    Plaza.get().then(function (response) {
      $scope.plaza = Plaza.data;
      $scope.playerData.exam.tutorial_memo_coin_bonus_amount = Plaza.data.virtual_money;
    });

    $scope.confirm = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_confirm_pop-up.html',
        controller: 'ProgressQuizConfirmModalCtrl',
        windowClass: 'progress-quiz-confirm-modal',
        resolve: {
          id: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] && $scope[msg] instanceof Function) $scope[msg](id);
      });
    }

    $scope.buyGuide = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: 'BuyGuideModalCtrl',
        windowClass: 'buy-guide-popup-modal',
        resolve: {
          id: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] && $scope[msg] instanceof Function) $scope[msg](id);
      });
    }

    $scope.buy = function (itemId) {
      Plaza.buy({
        base_item_id: itemId,
        quantity: 1
      }).then(function (response) {
        $scope.plaza = Plaza.data;
        $scope.playerData.exam.tutorial_memo_coin_bonus_amount = Plaza.data.virtual_money;
      });
    };
  }

  function WelcomeMemoCoinCtrl($scope) {}

  angular.module('welcome.plaza', []);
  angular.module('welcome.plaza')
    .controller('WelcomePlazaCtrl', ['$scope', 'Plaza', '$location', 'Profile', '$modal',
      WelcomePlazaCtrl
    ])
    .directive('welcomePlaza', function () {
      return {
        restrict: 'EA',
        scope: {
          playerData: '='
        },
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
          memoCoin: "=",
          hide: "="
        },
        replace: true,
        controller: 'WelcomeMemoCoinCtrl',
        controllerAs: 'welcomeMemoCoin',
        template: [
          '<span ng-class="{\'hide\': hide}" style="line-height:80px;vertical-align:middle;padding:10px;background:#ffbb33;color:#fff;font-size:20px;">',
          'Bạn đang có {{memoCoin}} <span class="memo-coin-badge small"></span>',
          '</span>'
        ].join('')
      };
    });
}(window.angular));