'use strict';

angular.module('header', ['header.controllers']);
angular.module('header.controllers', [])
    .controller('HeaderCtrl', [
	'$rootScope', '$scope', 'AuthService',
	function($rootScope, $scope, AuthService) {
	    $scope.logout = function() {
		AuthService.logout();
	    };
	    $scope.menus = [
		{'title': 'Trang chủ', 'link': '/home'},
		{'title': 'Hoạt động', 'link': '/activity'},
		{'title': 'Thảo luận', 'link': '/discussion'}
	    ];
	}
    ]);
