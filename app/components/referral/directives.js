/**
 * Referral Directives
 */

(function(ang){
  'use strict';
  ang.module('referral.directives', [])
    .directive('status', function(){
      return {
        strict: 'EA',
        controller: 'ReferralCtrl',
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralHeader', function(){
      return {
        strict: 'EA',
        controller: 'ReferralHeaderCtrl',
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralBody', function(){
      return {
        strict: 'EA',
        controller: 'ReferralBodyCtrl',
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralFooter', function(){
      return {
        strict: 'EA',
        controller: 'ReferralFooterCtrl',
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralEntercodeCtrl', function(){
      return {
        strict: 'EA',
        controller: 'ReferralEntercodeCtrl',
        //templateUrl: 'components/landingpage/_entercode.html'
      };
    });

})(window.angular);