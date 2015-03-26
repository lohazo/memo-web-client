(function (angular) {
  'use strict';

  function weakestWordConfig($routeProvider) {
  	$routeProvider.when('/weakestword/detail', {
  		templateUrl: 'exam/weakestWord/_weakest-word-detail.html',
  		// controller: 'WeakestWordCtrl'
  	});
  };
  

  angular.module('weakestWord', [])
    .config(['$routeProvider', weakestWordConfig])
}(window.angular));