'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.controllers', [])
    .controller('LpCtrl', [
	'$scope',
	function($scope) {
	}
    ])
    .controller('LpHeaderCtrl', [
	'$scope',
	'$http',
	function($scope, $http) {
	}
    ])
    .controller('LpStatCtrl', [
	'$scope',
	function($scope) {
	}
    ])
    .controller('LpCommentsCtrl', [
	'$scope',
	function($scope) {
	    $scope.comment = {
		user: 'Phương Nguyễn',
		content: 'Ứng dụng quá cool! Ngay cả bé nhà mình cũng thích chơi với kiến Memo :D'
	    };
	}
    ]);
