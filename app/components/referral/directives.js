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
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralHeader', function(){
      return {
        strict: 'EA',
        controller: 'ReferralHeaderCtrl'
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralBody', function(){
      return {
        strict: 'EA',
        controller: 'ReferralBodyCtrl',
        templateUrl: 'components/referral/_body.html'
      };
    })
    // .directive('referralBodyOne', function(){
    //   return {
    //     strict: 'EA',
    //     controller: 'ReferralBodyCtrl',
    //     templateUrl: 'components/referral/_step_one.html'
    //   };
    // })
    .directive('referralFooter', function(){
      return {
        strict: 'EA',
        controller: 'ReferralFooterCtrl'
        // templateUrl: 'components/landingpage/_header.html'
      };
    })
    .directive('referralEntercodeCtrl', function(){
      return {
        strict: 'EA',
        controller: 'ReferralEntercodeCtrl',
        //templateUrl: 'components/landingpage/_entercode.html'
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
      })

    .directive('referralMainScreen3', function(){
          return {
              strict: 'EA',
              templateUrl: 'components/referral/_screen-3-main.html'
          }
      })

    .directive('referralTopScreen3', function(){
          return {
              strict: 'EA',
              templateUrl: 'components/referral/_screen-3-top.html'
          }
      })

    .directive('referralCenterScreen3', function(){
          return {
              strict: 'EA',
              templateUrl: 'components/referral/_screen-3-center.html'
          }
      })

    .directive('referralBottomScreen3', function(){
        return {
            strict: 'EA',
            templateUrl: 'components/referral/_screen-3-bottom.html'
        }
    })
    .directive('submitcodeModal', function() {
        return {
            strict: 'EA',
            templateUrl: 'components/referral/_submitcode_modal.html'
        }
    })
})(window.angular);