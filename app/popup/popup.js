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
      var endpoint = 'http://staging.memo.edu.vn/v3/api/popup/open?auth_token=' + authToken + '&platform=web&popup_id=' + data._id + '&popup_type=' + data.type + '&localize=' + localize;

      return $http.get(endpoint);
    }

    return Services;
  }

  function PopupCtrl ($scope, popups, PopupServices, MemoTracker) {
    $scope.popups = popups;

    $scope.clickPopup = function (data) {
      MemoTracker.track(data.type);
      PopupServices.openPopup(data);
    };
  }

  angular.module('popup', [])
    .factory('PopupServices', ['$http', '$localStorage', 'API', '$location', PopupServices])
    .controller('PopupCtrl', ['$scope', 'popups', 'PopupServices', 'MemoTracking', PopupCtrl]);
}(window.angular));