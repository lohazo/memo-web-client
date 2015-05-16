(function (angular){

  'use strict';

  function PopupServices ($http, $localStorage, API) {
    var Services = {};

    Services.getPopup = function () {
      var authToken = $localStorage.auth.user.auth_token;
      var endpoint = API + '/popup/?platform=web&auth_token=' + authToken ;

      return $http.get(endpoint);
    }
    
    return Services;
  }

  angular.module('popup', [])
    .factory('PopupServices', ['$http', '$localStorage', 'API', PopupServices]);
}(window.angular));