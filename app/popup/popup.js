(function (angular){

  'use strict';

  function PopupServices ($http, $localStorage, API, $location) {
    var Services = {};

    Services.getPopup = function () {
      var authToken = $localStorage.auth.user.auth_token;
      var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';
      var endpoint = 'http://staging.memo.edu.vn/v3/api/popup?platform=web&localize=' + localize + '&auth_token=' + authToken ;

      return $http.get(endpoint);
    };
    
    Services.openPopup = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';
      var endpoint = 'http://services.memo.edu.vn/v3/api/popup/open?auth_token=' + authToken + '&platform=web&popup_id=' + data.id + '&popup_type=' + data.type + '&localize=' + localize;

      return $http.get(endpoint);
    }

    return Services;
  }

  function PopupCtrl ($scope, popups, PopupServices, MemoTracker, $modalInstance, $modal) {
    $scope.popups = popups;

    $scope.clickPopup = function (data) {
      data.id = popups._id;

      MemoTracker.track(data._id);
      PopupServices.openPopup(data);
      if (data.type == 'exit' || data.type == 'nevershow') {
        $scope.cancel();
      };
      if (data.type == 'webview') {
        $scope.cancel();
        $scope.openWebview(data);
      };
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.openWebview = function (data) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: ['$scope', '$sce', '$modalInstance', function ($scope, $sce, $modalInstance) {
          $scope.trustedResource = $sce.trustAsResourceUrl(data.url);
        }],
        windowClass: 'buy-guide-popup-modal',
      });
    };
  }

  function PopupWebviewModalCtrl ($scope, $sce, $modalInstance) {

  }

  angular.module('popup', [])
    .factory('PopupServices', ['$http', '$localStorage', 'API', '$location', PopupServices])
    .controller('PopupCtrl', ['$scope', 'popups', 'PopupServices', 'MemoTracking', '$modalInstance', '$modal', PopupCtrl]);
}(window.angular));