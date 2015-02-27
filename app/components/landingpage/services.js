'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.services', [])
  .factory('MolServices', [
    '$rootScope', '$http', '$q',
    function ($rootScope, $http, $q) {
      var HOST = 'http://api.memo.edu.vn/api/v1.7/users';

      function transformRequest(obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }

      return {
        saveC2: function (data) {
          var deferred = $q.defer();
          var endpoint = "/moladd";
          $http.post(HOST + endpoint, data, {
            ignoreLoadingBar: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: transformRequest
          }).then(function (c2Response) {
            deferred.resolve(c2Response);
          });
          return deferred.promise;
        },
        saveC3: function (data) {
          var deferred = $q.defer();
          var endpoint = "/addcontact";
          $http.post(HOST + endpoint, data, {
            ignoreLoadingBar: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: transformRequest
          }).then(function (c3Response) {
            deferred.resolve(c3Response);
          });
          return deferred.promise;
        }
      };
    }
  ]);