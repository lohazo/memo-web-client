(function(angular) {
  'use strict';

  function ReferralConfig($routeProvider) {
    $routeProvider
      .when('/referral', {
        templateUrl: 'components/referral/_index.html',
        controller: 'ReferralCtrl',
        resolve: {
          joined: function(ReferralService){ 
            ReferralService.getStatus().then(function(res){
              if (res.data.record) ReferralService.status = 1;
              else ReferralService.status = 0;
            },function(res){
              ReferralService.status = 0;
            });
          }
        }
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