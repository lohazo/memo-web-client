(function (angular) {
  'use strict';

  function TutorialPlayerCtrl($scope) {
    $scope.question = {
      type: 'translate'
    };
  }

  function PlayerCarouselCtrl($scope, $location, AppSetting, MemoTracker) {
    // var trackingText = 'take a tour v{0} slide {1}';
    // $scope.slideIndex = 0;

    // function init() {
    //   $scope.slides = AppSetting.sharedSettings.take_a_tour.images;
    //   $scope.slide = $scope.slides[$scope.slideIndex];
    //   trackingText = trackingText.replace('{0}', AppSetting.sharedSettings.take_a_tour.version);
    //   MemoTracker.track(trackingText.replace('{1}', 1));
    // }

    // if (AppSetting.sharedSettings) {
    //   init();
    // } else {
    //   AppSetting.getSharedSettings()
    //     .then(init);
    // }

    // function goToSlide(index) {
    //   $scope.slideIndex = index;
    //   $scope.slide = $scope.slides[$scope.slideIndex];
    //   if ($scope.slideIndex < ($scope.slides.length - 1)) {
    //     MemoTracker.track(trackingText.replace('{1}', $scope.slide.order));
    //   } else {
    //     MemoTracker.track(trackingText.replace('{1}', '9999'));
    //   }
    // }

    // function next() {
    //   if ($scope.slideIndex < $scope.slides.length - 1) {
    //     goToSlide($scope.slideIndex + 1);
    //   } else {
    //     AppSetting.disableTour();
    //     $location.path('/');
    //   }
    // }

    // function previous() {
    //   goToSlide($scope.slideIndex - 1);
    // }

    // function skip() {
    //   AppSetting.disableTour();
    //   MemoTracker.track('skip ' + trackingText.replace('{1}', $scope.slide.order));
    //   $location.path('/');
    // }

    // $scope.control = {
    //   next: next,
    //   previous: previous,
    //   skip: skip,
    //   goToSlide: goToSlide
    // };
  }

  angular.module('welcome')
    .controller('TutorialPlayerCtrl', ['$scope', TutorialPlayerCtrl])
    .controller('PlayerCarouselCtrl', ['$scope', '$location', 'AppSetting', 'MemoTracking',
      PlayerCarouselCtrl
    ]);
}(window.angular));