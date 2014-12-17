(function(angular) {

  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
      templateUrl: 'welcome/_index.html',
      controller: 'WelcomeCtrl'
    });
  }

  function WelcomeCtrl($scope) {}

  function PlayerCarouselCtrl($scope, $location, AppSetting, MemoTracker) {
    $scope.slideIndex = 0;
    if (AppSetting.sharedSettings) {
      $scope.slides = AppSetting.sharedSettings.take_a_tour;
      MemoTracker.track('take a tour slide 1');
    } else {
      AppSetting.getSharedSettings().then(function(response) {
        $scope.slides = AppSetting.sharedSettings.take_a_tour;
        MemoTracker.track('take a tour slide 1');
      });
    }

    function next() {
      if ($scope.slideIndex < $scope.slides.length - 1) {
        goToSlide($scope.slideIndex + 1);
      } else {
        $location.path('/');
      }
    }

    function previous() {
      goToSlide($scope.slideIndex - 1);
    }

    function skip() {
      MemoTracker.track('skip take a tour ' + $scope.slide.order);
      $location.path('/');
    }

    function goToSlide(index) {
      $scope.slideIndex = index;
      $scope.slide = $scope.slides[$scope.slideIndex];
      MemoTracker.track('take a tour slide ' + $scope.slide.order);
    }

    $scope.control = {
      next: next,
      previous: previous,
      skip: skip,
      goToSlide: goToSlide
    };
  }

  angular.module('welcome', ['app.services']).config(['$routeProvider', WelcomeConfig]);
  angular.module('welcome')
    .controller('WelcomeCtrl', ['$scope', WelcomeCtrl])
    .controller('PlayerCarouselCtrl', ['$scope', '$location', 'AppSetting', 'MemoTracking', PlayerCarouselCtrl]);
  angular.module('welcome')
    .directive('playerContainerWelcome', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-container.html'
      };
    })
    .directive('playerHeader', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-header.html'
      };
    })
    .directive('playerFooter', function() {
      return {
        strict: 'EA',
        scope: true,
        templateUrl: 'components/player/_player-header.html'
      };
    });
  angular.module('welcome')
    .directive('playerContainerCarousel', function() {
      return {
        strict: 'EA',
        scope: true,
        controller: 'PlayerCarouselCtrl',
        templateUrl: 'components/player/_player-container-carousel.html'
      };
    });
}(window.angular));