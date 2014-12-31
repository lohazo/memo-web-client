/**
 * Referral Controllers
 */

(function(angular) {
  'use strict';

  function ReferralCtrl($scope, ReferralService) {

  }

  function ReferralStatusCtrl(service) {
    service.getStatus().then(function(res) {
      console.log(res.data);
    });
  }

  angular.module('referral.controllers', [])
    .controller('ReferralCtrl', ['ReferralService', ReferralCtrl])
    .controller('ReferralStatusCtrl', ['ReferralService', ReferralStatusCtrl])
})(window.angular);