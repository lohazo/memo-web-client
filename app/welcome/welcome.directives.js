(function (angular) {

  'use strict';

  angular.module('welcome')
    .directive('playerContainer', function () {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-container.html'
      };
    })
    .directive('playerHeader', function () {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-header.html'
      };
    })
    .directive('playerFooter', function () {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-footer.html'
      };
    })
    .directive('introScreen', function () {
      return {
        strict: 'EA',
        scope: {},
        templateUrl: 'welcome/_intro-screen.html'
      };
    });

  angular.module('welcome')
    .directive('playerContainerCarousel', function () {
      return {
        strict: 'EA',
        scope: true,
        controller: 'TutorialPlayerCtrl',
        link: function ($scope, $element, $attr) {
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
        templateUrl: 'welcome/_player.html'
      };
    });
}(window.angular));