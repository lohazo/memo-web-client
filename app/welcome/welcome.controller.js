(function (angular) {
    'use strict';

    function PlayerCarouselCtrl($scope, $location, AppSetting, MemoTracker) {}

    angular.module('welcome')
        .controller('PlayerCarouselCtrl', ['$scope', '$location', 'AppSetting', 'MemoTracking',
            PlayerCarouselCtrl
        ]);
}(window.angular));