/**
 * Referral Directives
 */

(function(ang){
  'use strict';
  ang.module('referral.directives', [])
    .directive('status', function(){
      return {
        strict: 'EA',
        controller: 'ReferralStatusCtrl'
        // templateUrl: 'components/landingpage/_header.html'
      };
    })

     .directive('referralMain', function(){
        return {
          strict: 'EA',
          templateUrl: 'components/referral/_main.html'
        }
      })

    .directive('screenTop', function(){
        return {
          strict: 'EA',
          templateUrl: 'components/referral/_main-top-Screen-2.html'
        }
      })

    .directive('screenCenter', function(){
        return {
          strict: 'EA',
          templateUrl: 'components/referral/_main-center-Screen-2.html'
        }
      })

    .directive('screenBottom', function(){
        return {
          strict: 'EA',
          templateUrl: 'components/referral/_main-bottom-Screen-2.html'
        }
      });
})(window.angular);