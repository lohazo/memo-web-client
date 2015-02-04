(function (angular) {
  'use strict';

  function NativeScholarModalCtrl($scope, $modal) {
    var ctrl = this;
    ctrl.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'welcome/plaza/_native-scholar-modal.html',
        windowClass: 'native-scholar-modal'
      });
    };

    $scope.open = ctrl.open;
  }

  angular.module('welcome.plaza')
    .controller('NativeScholarModalCtrl', ['$scope', '$modal', NativeScholarModalCtrl])
    .directive('welcomeNativeScholar', function () {
      return {
        restrict: 'EA',
        controller: 'NativeScholarModalCtrl',
        controllerAs: 'scholarModal'
      };
    });
}(window.angular));