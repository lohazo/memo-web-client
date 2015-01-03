(function(angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider
      .when('/referral', {
        templateUrl: 'components/referral/_index.html',
        controller: 'ReferralCtrl',
        // resolve: {
        //   getStatus: function(ReferralService) {
        //     return ReferralService.getStatus();
        //   },
        //   getDetail: function(Profile) {
        //     // console.log(Profile);
        //     return Profile.detail;
        //   }
        // }
      })
      .when('/referral/profile', {
        templateUrl: 'components/referral/_entercode.html',
        controller: 'ReferralEntercodeCtrl',
      })
  }

  angular.module('referral', [
    'referral.directives',
    'referral.controllers',
    'referral.services'
  ]).config(['$routeProvider', ReferralConfig]);
})(window.angular);