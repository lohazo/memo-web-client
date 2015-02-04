(function (angular) {
  'use strict';

  function WelcomePlayerCtrl($scope, $location) {
    var ctrl = this;
    ctrl.data = $scope.welcomePlayer;
    ctrl.click = $scope.click;
    ctrl.skip = function () {
      ctrl.data.skip().then(function () {
        $location.path('/');
      });
    }
  }

  function WelcomePlayerHeaderCtrl($scope) {
    var ctrl = this;
    ctrl.settings = $scope.settings;
    ctrl.currentStep = $scope.currentStep;
    ctrl.answeredSteps = $scope.answeredSteps;
    ctrl.getNumber = function (num) {
      return new Array(num);
    };
    ctrl.skip = $scope.skip;
  }

  function WelcomePlayerFooterCtrl($scope) {
    var ctrl = this;
    ctrl.settings = $scope.settings;
    ctrl.question = $scope.question;
    ctrl.click = $scope.click;
  }

  angular.module('welcome.player', []);
  angular.module('welcome.player')
    .controller('WelcomePlayerCtrl', ['$scope', '$location', WelcomePlayerCtrl])
    .controller('WelcomePlayerHeaderCtrl', ['$scope', WelcomePlayerHeaderCtrl])
    .controller('WelcomePlayerFooterCtrl', ['$scope', WelcomePlayerFooterCtrl])
    .directive('welcomePlayerContainer', function () {
      return {
        strict: 'EA',
        scope: {
          welcomePlayer: "=player",
          click: "&"
        },
        controller: 'WelcomePlayerCtrl',
        controllerAs: 'player',
        link: function ($scope, $element, $attrs) {
          $element[0].focus();
          $element.bind('keydown', function (e) {
            if (e.keyCode === 13) {
              // 'Enter'
              $scope.control.next();
              $scope.$apply();
            } else if (e.keyCode === 8) {
              // 'Backspace'
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          });
        },
        templateUrl: 'welcome/player/_player-container.html'
      };
    })
    .directive('welcomePlayerHeader', function () {
      return {
        strict: 'EA',
        scope: {
          settings: "=",
          currentStep: "@",
          answeredSteps: "@",
          skip: "&"
        },
        controller: 'WelcomePlayerHeaderCtrl',
        controllerAs: 'playerHeader',
        templateUrl: 'welcome/player/_player-header.html',
      };
    })
    .directive('welcomePlayerFooter', function () {
      return {
        strict: 'EA',
        scope: {
          settings: "=",
          question: "=",
          click: "&"
        },
        controller: 'WelcomePlayerFooterCtrl',
        controllerAs: 'playerFooter',
        templateUrl: 'welcome/player/_player-footer.html'
      };
    });
}(window.angular));