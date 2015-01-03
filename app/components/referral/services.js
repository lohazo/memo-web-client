/**
 * Referral Services
 */

(function(angular) {
  'use strict';

  function ReferralService($http, $q, $localStorage, API) {
    var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '',
      Apis = {
        // GET
        status: '/referral/referral_status?auth_token=',

        // POST
        submit_code: '/referral/submit_referral_code',
        check_code: '/referral/check_referral_code',
        verify_rewards: '/referral/verify_rewards'
      },
      Referral = {};
    Referral.getStatus = function() {
      var deferred = $q.defer();

      $http.get(API + Apis.status + authToken)
        .then(function(res) {
          deferred.resolve(res);
        }, function(res) {
          deferred.reject(res);
        });

      return deferred.promise;
    };

    Referral.submitCode = function(ref_code) {
      var deferred = $q.defer(),
        data = {
          auth_token: authToken,
          referral_code: ref_code
        };

      $http.post(API + Apis.submit_code, data)
        .then(function(res) {
          deferred.resolve(res);
        }, function(res) {
          deferred.reject(res);
        });

      return deferred.promise;
    };

    Referral.checkCode = function(ref_code) {
      var deferred = $q.defer(),
        data = {
          auth_token: authToken,
          referral_code: ref_code
        };

      $http.post(API + Apis.check_code, data)
        .then(function(res) {
          deferred.resolve(res);
        }, function(res) {
          deferred.reject(res);
        });

      return deferred.promise;
    };

    Referral.verifyRewards = function() {
      var deferred = $q.defer(),
        data = {
          auth_token: authToken,
          // verify_rewards: ref_code
        };

      $http.post(API + Apis.verify_rewards, data)
        .then(function(res) {
          deferred.resolve(res);
        }, function(res) {
          deferred.reject(res);
        });

      return deferred.promise;
    };

    return Referral;
  }

  angular.module('referral.services', [])
    .factory('ReferralService', ['$http', '$q', '$localStorage', 'API', ReferralService])
})(window.angular);