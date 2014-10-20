'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.controllers', ['ngStorage'])
    .controller('AppCtrl', [
	'$rootScope',
	'$scope',
	'$localStorage',
	function($rootScope, $scope, $localStorage) {
	    $scope.auth = $localStorage.auth || {
		loggedIn: false,
		trial: false
	    };

	    $rootScope.$on('event:auth-loginConfirmed', function(e, data) {	
		$scope.auth = {
		    loggedIn: true,
		    user: data.user,
		    trial: data.is_trial
		};
		$localStorage.auth = $scope.auth;
	    });
	}
    ]);
