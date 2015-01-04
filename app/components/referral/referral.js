(function(angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider
      .when('/referral', {
        templateUrl: 'components/referral/_index.html',
        controller: 'ReferralCtrl'
      })
      .when('/referral/profile', {
        templateUrl: 'components/referral/_entercode.html',
        controller: 'ReferralEntercodeCtrl'
      })
  }

  angular.module('referral', [
    'referral.directives',
    'referral.controllers',
    'referral.services'
  ]).config(['$routeProvider', ReferralConfig]);
})(window.angular);