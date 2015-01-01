/**
 * Referral Controllers
 */

(function(angular) {
  'use strict';

  function ReferralCtrl($scope, service) {
    $scope.submitCode = function(){
      var ref_code = $scope.ref_code;

      service.verifyRewards(ref_code).then(function(res){
        console.log(res.data);
      }, function(res){
        $scope.error = res.data.message;
        console.log(res.data.message);
      });
    };
  };

  angular.module('referral.controllers', [])
        .controller('ReferralCtrl', ['$scope', 'ReferralService', ReferralCtrl])
})(window.angular);