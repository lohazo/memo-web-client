'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.controllers', [])
    .controller('AppCtrl', [
	'$rootScope',
	'$scope',
	function($rootScope, $scope) {
	    $scope.auth = {
		loggedIn: false,
		trial: false
	    };
	}
    ]);
