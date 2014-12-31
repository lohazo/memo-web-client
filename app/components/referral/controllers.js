/**
 * Referral Controllers
 */

(function(angular){
  'use strict';
  function ReferralStatusCtrl(service) {
    service.getStatus().then(function(res){
      console.log(res.data);
    });
  }

  angular.module('referral.controllers', [])
        .controller('ReferralStatusCtrl', ['ReferralService', ReferralStatusCtrl])
})(window.angular);