/**
 * Referral Services
 */

(function(angular){
  'use strict';
  function ReferralService($http, $q, $localStorage, API) {
    var Apis = {
      status: '/referral/referral_status?auth_token=',
      submit: '/referral/submit_referral_code',
      check_referral: '/referral/check_referral_code?auth_token=',
      verify_rewards: '/referral/verify_rewards'
    };

    var Referral = {};

    Referral.getStatus = function(){
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API + Apis.status + authToken)
          .then(function(res) {
            // $localStorage.messages = res.data;
            deferred.resolve(res);
          }, function(res){
            deferred.reject(res);
          });

      return deferred.promise;
    };

    Referral.submitCode = function(){
      var deferred = $q.defer();

      $http.post()
          .then(function(res){
            $localStorage.messages = res.data;
            deferred.resolve(res);
          }, function(res){
            deferred.reject(res);
          });

      return deferred.promise;
    };
    return Referral;
  }

  angular.module('referral.services', [])
        .factory('ReferralService', ['$http', '$q', '$localStorage', 'API', ReferralService])
})(window.angular);