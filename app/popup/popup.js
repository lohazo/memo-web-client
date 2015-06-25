(function (angular){

  'use strict';

  function PopupServices ($http, $localStorage, API, $location) {
    var Services = {};

    Services.getPopup = function () {
      var authToken = $localStorage.auth.user.auth_token;
      var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';
      var endpoint = 'http://staging.memo.edu.vn/v3/api/popup?platform=web&auth_token=' + authToken ;

      return $http.get(endpoint);
    };

    return Services;
  }

  function PopupCtrl ($scope) {
  }

  angular.module('popup', [])
    .factory('PopupServices', ['$http', '$localStorage', 'API', '$location', PopupServices])
    .controller('PopupCtrl', ['$scope', PopupCtrl]);
}(window.angular));