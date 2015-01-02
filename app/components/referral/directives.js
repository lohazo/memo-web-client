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
<<<<<<< HEAD
        controller: 'ReferralBodyCtrl',
        templateUrl: 'components/referral/_body.html'
=======
        controller: 'ReferralBodyCtrl'
        // templateUrl: 'components/landingpage/_header.html'
>>>>>>> cd4a775cd5c60016997f62c8cd3fa498d9b9a4de
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

})(window.angular);