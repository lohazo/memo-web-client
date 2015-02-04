(function (angular) {

  'use strict';

  angular.module('welcome')
    .directive('introScreen', function () {
      return {
        strict: 'EA',
        scope: {
          message: "@"
        },
        templateUrl: 'welcome/_intro-screen.html'
      };
    })
    .directive('dictionaryHintScreen', function () {
      return {
        strict: 'EA',
        scope: {},
        templateUrl: 'welcome/_dictionary-hint-screen.html'
      };
    });

  // angular.module('welcome')
  //   .directive('playerContainerCarousel', function () {
  //     return {
  //       strict: 'EA',
  //       scope: true,
  //       controller: 'TutorialPlayerCtrl',
  //       link: function ($scope, $element, $attr) {
  //         $element[0].focus();
  //         $element.bind('keydown', function (e) {
  //           if (e.keyCode === 13) {
  //             // 'Enter'
  //             $scope.control.next();
  //             $scope.$apply();
  //           } else if (e.keyCode === 8) {
  //             // 'Backspace'
  //             e.preventDefault();
  //             e.stopPropagation();
  //             return false;
  //           }
  //         });
  //       },
  //       templateUrl: 'welcome/_player.html'
  //     };
  //   });
}(window.angular));