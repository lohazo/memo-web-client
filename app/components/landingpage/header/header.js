'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.login', [])
    .directive('loginModal', function() {
	return {
	    restrict: 'EA',
	    scope: true,
	    replace: true,
	    link: function($scope, $ele) {
	    },
	    templateUrl: 'components/landingpage/header/_login-modal.html'
	};
    })
    .directive('registerModal', function() {
	return {
	    restrict: 'EA',
	    scope: true,
	    replace: true,
	    link: function($scope, $ele) {
	    },
	    templateUrl: 'components/landingpage/header/_register-modal.html'
	};
    })
    .controller('LoginModalCtrl', [
	'$scope',
	'$modal',
	function($scope, $modal) {
	    $scope.open = function() {
		var modalInstance = $modal.open({
		    template: '<div login-modal></div>',
		    controller: 'LoginModalInstanceCtrl',
		    windowClass: 'login-modal'
		});

		modalInstance.result.then(function(msg) {
		    if ($scope[msg] instanceof Function) $scope[msg]();
		});
	    };

	    $scope.openRegister = function() {
		var modalInstance = $modal.open({
		    template: '<div register-modal></div>',
		    controller: 'LoginModalInstanceCtrl',
		    windowClass: 'register-modal'
		});

		modalInstance.result.then(function(msg) {
		    if ($scope[msg] instanceof Function) $scope[msg]();
		});
	    };
	}
    ])
    .controller('LoginModalInstanceCtrl', [
	'$rootScope',
	'$scope',
	'$modalInstance',
	'AuthService',
	function($rootScope, $scope, $modalInstance, AuthService) {
	    $scope.registerModal = function() {
		$modalInstance.close('openRegister');
	    };

	    $scope.loginModal = function() {
		$modalInstance.close('open');
	    };

	    $scope.FbLogin = function() {
		AuthService.FbLogin();
	    };
	    
	    $scope.GLogin = function() {
		AuthService.GLogin();
	    };
	    
	    $rootScope.$on('event:auth-loginConfirmed', function(e, data) {
		$modalInstance.close();
	    });
	}
    ]);