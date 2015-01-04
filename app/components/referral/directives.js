/**
 * Referral Directives
 */

(function(ang) {
  'use strict';
  ang.module('referral.directives', [])
    .directive('status', function() {
      return {
        strict: 'EA',
        controller: 'ReferralCtrl'
      };
    })
    .directive('referralBody', function() {
      return {
        strict: 'EA',
        controller: 'ReferralBodyCtrl',
        templateUrl: 'components/referral/_body.html'
      };
    })
    .directive('referralFooter', function() {
      return {
        strict: 'EA',
        controller: 'ReferralFooterCtrl'
      };
    })
    .directive('referralEntercodeCtrl', function() {
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
    .directive('nativePageIntro', function() {
      return {
        strict: 'EA',
        replace: true,
        templateUrl: 'components/referral/_native-page-intro.html'
      };
    })
    .directive('priceScholarship', function() {
      return {
        strict: 'EA',
        replace: true,
        templateUrl: 'components/referral/_price-scholarship.html'
      };
    })
    .directive('paymentMethod', function() {
      return {
        strict: 'EA',
        replace: true,
        templateUrl: 'components/referral/_payment-method.html'
      };
    })
})(window.angular);