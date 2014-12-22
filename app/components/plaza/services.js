(function(angular) {
  'use strict';
  angular.module('plaza.services', [])
    .factory('Plaza', ['PlazaServices', '$localStorage', function(PlazaServices, $localStorage) {
      var Plaza = {};

      Plaza.data = {};

      Plaza.get = function(data) {
        return PlazaServices.get(data).then(function(response) {
          Plaza.data = response.data;
        });
      };

      Plaza.buy = function(data) {
        return PlazaServices.buy(data)
          .then(function(response) {
            $localStorage.auth.profile_detail.virtual_money = response.data.virtual_money;
          })
          .then(Plaza.get);
      };

      Plaza.use = function(data) {
        return PlazaServices.use(data)
          .then(function(response) {});
      };

      return Plaza;
    }])
    .factory('PlazaServices', [
      '$http', '$q', '$localStorage', 'API_PHP',
      function($http, $q, $localStorage, API_PHP) {
        var Services = {};

        Services.get = function(data) {
          var deferred = $q.defer();

          var authToken = $localStorage.auth.user.auth_token;
          $http.get(API_PHP + '/plaza?device=web&localize=vi&auth_token=' + authToken)
            .then(function(response) {
              deferred.resolve(response);
            });

          return deferred.promise;
        };

        Services.buy = function(data) {
          var deferred = $q.defer();

          var authToken = $localStorage.auth.user.auth_token;

          data.auth_token = authToken;
          data.device = 'web';

          $http.post(API_PHP + '/plaza/buy_item', data)
            .then(function(response) {
              deferred.resolve(response);
            });

          return deferred.promise;
        };

        Services.use = function(data) {
          var deferred = $q.defer();

          var authToken = $localStorage.auth.user.auth_token;

          data.auth_token = authToken;
          data.device = 'web';

          $http.post(API_PHP + '/plaza/use_item', data)
            .then(function(response) {
              deferred.resolve(response);
            });

          return deferred.promise;
        };
        return Services;
      }
    ]);

}(window.angular));