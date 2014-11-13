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
		$ele.bind('keypress', function(e) {
		    if (e.keyCode === 13) {
			$scope.login();
		    }
		});
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
		$ele.bind('keypress', function(e) {
		    if (e.keyCode === 13) {
			$scope.login();
		    }
		});
	    },
	    templateUrl: 'components/landingpage/header/_register-modal.html'
	};
    })
    .controller('LoginModalCtrl', [
	'$scope',
	'$rootScope',
	'$modal',
	function($scope, $rootScope, $modal) {
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
	'$rootScope', '$scope',	'$timeout',
	'$modalInstance', '$routeParams', 'AuthService',
	function($rootScope, $scope, $timeout, $modalInstance, $routeParams, AuthService) {
	    $scope.user = {};
	    $scope.error = '';
	    $scope.registerModal = function() {
		$modalInstance.close('openRegister');
	    };

	    $scope.loginModal = function() {
		$modalInstance.close('open');
	    };

	    $scope.FbLogin = function() {
		AuthService.FbLogin();
		$rootScope.$on('event:auth-loginConfirmed', function() {
		    $timeout(closeModal, 10);
		});
	    };

	    $scope.GLogin = function() {
		AuthService.GLogin().then(closeModal, displayMessageOnFail);
	    };

	    $scope.register = function() {
		AuthService.register($scope.user)
		    .then(closeModal, displayMessageOnFail);
	    };

	    $scope.login = function() {
		AuthService.login($scope.user)
		    .then(closeModal, displayMessageOnFail);
	    };

	    function closeModal(data) {
		if ($modalInstance) {
		    $modalInstance.close();
		}
	    }

	    function displayMessageOnFail(response) {
		$scope.error = response.data.error;
	    }
	}
    ]);
