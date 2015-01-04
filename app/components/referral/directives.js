/**
 * Referral Directives
 */

(function(ang){
  'use strict';
  ang.module('referral.directives', [])
    .directive('status', function(){
      return {
        strict: 'EA',
        controller: 'ReferralCtrl'
      };
    })
    .directive('referralBody', function(){
      return {
        strict: 'EA',
        controller: 'ReferralBodyCtrl',
        templateUrl: 'components/referral/_body.html'
      };
    })
    .directive('referralFooter', function(){
      return {
        strict: 'EA',
        controller: 'ReferralFooterCtrl'
      };
    })
    .directive('referralEntercodeCtrl', function(){
      return {
        strict: 'EA',
        controller: 'ReferralEntercodeCtrl',
      };
    })
    .directive('submitcodeModal', function() {
      return {
        strict: 'EA',
        templateUrl: 'components/referral/_submitcode_modal.html'
      }
    })
})(window.angular);