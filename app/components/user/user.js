(function (angular) {
  'use strict';

  function UserServices($http, $q, $localStorage) {
    var Services = this;

    var apiEndpoint = 'http://staging.memo.edu.vn/v2/api/users';

    Services.create = function (data) {
      var deferred = $q.defer();

      $http.post(apiEndpoint, data)
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        }).error(function (data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    return Services;
  }

  angular.module('user', []);
  angular.module('user')
    .factory('UserServices', ['$http', '$q', '$localStorage', UserServices]);
}(window.angular));