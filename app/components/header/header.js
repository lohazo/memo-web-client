'use strict';

angular.module('header', ['header.controllers']);
angular.module('header.controllers', [])
    .controller('HeaderCtrl', [
	'$rootScope', '$scope', '$location', 'AuthService',
	function($rootScope, $scope, $location, AuthService) {
	    $scope.getActiveItem = function(path) {
		if ($location.path().substr(0, path.length) == path) {
		    return "active";
		} else {
		    return "";
		}
	    };
	    $scope.logout = function() {
		AuthService.logout();
	    };
	    $scope.menus = [
		{'title': 'Trang chủ', 'link': '/'},
		{'title': 'Hoạt động', 'link': '/activity'},
		{'title': 'Thảo luận', 'link': '/discussion'}
	    ];
	}
    ]);
