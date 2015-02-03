(function (angular) {
  'use strict';

  function ClaimTshirtModalCtrl($scope, $modal) {
    var ctrl = this;
    ctrl.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'welcome/plaza/_claim-tshirt-modal.html',
        windowClass: 'claim-tshirt-modal'
      });
    };

    $scope.open = ctrl.open;
  }

  angular.module('welcome.plaza')
    .controller('ClaimTshirtModalCtrl', ['$scope', '$modal', ClaimTshirtModalCtrl])
    .directive('welcomeClaimTshirt', function () {
      return {
        restrict: 'EA',
        controller: 'ClaimTshirtModalCtrl',
        controllerAs: 'tshirtModal'
      };
    });
}(window.angular));