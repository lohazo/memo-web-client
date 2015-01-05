(function(angular) {
  'use strict';

  function clickEventTrack() {
    return {
      strict: 'EA',
      scope: {
        trackingData: "@"
      },
      controller: 'ClickEventTrackCtrl',
      link: function($scope, $element) {
        $element.bind('click', function() {
          $scope.click();
        });
      }
    };
  }

  function ClickEventTrackCtrl($scope, EcoTracker) {
    var data = angular.fromJson($scope.trackingData);
    $scope.click = function() {
      EcoTracker.campaignTrack("Web 1.0.2 click event track", data);
    };
  }

  angular.module('tracking', [
    'tracking.services'
  ]);

  angular.module('tracking')
    .directive('clickEventTrack', clickEventTrack)
    .controller('ClickEventTrackCtrl', ['$scope', 'EcoTracking', ClickEventTrackCtrl]);
}(window.angular));