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

  function shareEventTrack() {
    return {
      strict: 'EA',
      link: function($scope, $element, $attr) {
        var data = angular.fromJson($attr.trackingData);
        $element.bind('click', function() {
          $scope.click(data);
        });
      },
      controller: 'ShareEventTrackCtrl'
    };
  }

  function ShareEventTrackCtrl($scope, MemoTracker) {
    $scope.click = function(data) {
      MemoTracker.track(data.eventName);
    };
  }

  angular.module('tracking', [
    'tracking.services'
  ]);

  angular.module('tracking')
    .directive('clickEventTrack', clickEventTrack)
    .controller('ClickEventTrackCtrl', ['$scope', 'EcoTracking', ClickEventTrackCtrl]);

  angular.module('tracking')
    .directive('shareEventTrack', shareEventTrack)
    .controller('ShareEventTrackCtrl', ['$scope', 'MemoTracking', ShareEventTrackCtrl]);
}(window.angular));