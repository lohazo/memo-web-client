'use strict';

angular.module('skill.controllers', [])
    .controller('SkillCtrl', [
	'$scope', '$rootScope', '$location', '$localStorage', '$routeParams', 'AuthService',
	'Skill',
	function($scope, $rootScope, $location, $localStorage, $routeParams, AuthService, Skill) {
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
		$localStorage.auth = $scope.auth;
		$location.path('/');
	    });

	    $scope.skill = Skill.skill($routeParams.id);
	}
    ]);
