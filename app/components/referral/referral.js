(function(angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider.when('/referral', {
      templateUrl: 'components/referral/_screen-3-main.html',

      controller: 'ReferralCtrl'
    });
  }

  angular.module('referral', [
    'referral.directives',
    'referral.controllers',
    'referral.services'
  ]).config(['$routeProvider', ReferralConfig]);
})(window.angular);