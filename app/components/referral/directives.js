/**
 * Referral Directives
 */

(function(ang){
  'use strict';
  ang.module('referral.directives', [])
    .directive('status', function(){
      return {
        strict: 'EA',
        controller: 'ReferralStatusCtrl',
        // templateUrl: 'components/landingpage/_header.html'
      };
    });
})(window.angular);