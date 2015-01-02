(function(angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider.when('/referral', {
      templateUrl: 'components/referral/_main.html',
      controller: 'ReferralCtrl'
    });
  }

  angular.module('referral', [
    'referral.directives',
    'referral.controllers',
    'referral.services'
  ]).config(['$routeProvider', ReferralConfig]);
})(window.angular);