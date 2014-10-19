'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.header', [])
    .directive('loginModal', function() {
	return {
	    restrict: 'EA',
	    scope: true,
	    replace: true,
	    controller: 'LoginModalInstanceCtrl',
	    link: function($scope, $ele) {
	    },
	    templateUrl: 'components/landingpage/header/_login-dropdown.html'
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
                    // if ($scope[msg] instanceof Function) $scope[msg]();
                });
            };

            $scope.openRegisterModal = function() {
                var modalInstance = $modal.open({
                    template: '<div register-modal></div>',
                    controller: 'LoginModalInstanceCtrl',
                    windowClass: 'register-modal'
                });

                modalInstance.result.then(function(msg) {
                    // if ($scope[msg] instanceof Function) $scope[msg]();
                });
            };
        }
    ])
    .controller('LoginModalInstanceCtrl', [
	function($scope, $modalInstance) {
	    
	}
    ]);
