'use strict';

angular.module('placement.controllers', [])
    .controller('PlacementCtrl', [
	'$scope', '$rootScope', '$location', '$localStorage', 'AuthService',
	'Placement',
	function($scope, $rootScope, $location, $localStorage, AuthService, PlacementTest) {
	    $scope.auth = $localStorage.auth || {
		loggedIn: false,
		trial: false
	    };

	    $rootScope.$on('event:auth-invalidToken', function(e, data) {
		AuthService.logout();
	    });
	    $rootScope.$on('event:auth-loginConfirmed', function(e, data) {
		$scope.auth = {
		    loggedIn: true,
		    user: data.user,
		    trial: data.is_trial
		};
		$localStorage.auth = $scope.auth;
	    });

	    $rootScope.$on('event:auth-logoutConfirmed', function(e, data) {
		$scope.auth = { loggedIn: false, trial: false };
		$localStorage.$reset();
		$localStorage.auth = $scope.auth;
		$location.path('/');
	    });

	    if ($scope.auth.loggedIn) {
		PlacementTest.start($scope.auth.user)
		    .then(function(response) {
		    });
	    }

	}]);
