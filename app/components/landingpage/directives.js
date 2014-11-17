'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.directives', [])
    .directive('landingHeader', function() {
        return {
            strict: 'EA',
            controller: 'LpHeaderCtrl',
            templateUrl: 'components/landingpage/_header.html'
        };
    })
    .directive('landingHead', function() {
        return {
            strict: 'EA',
	    scope: true,
	    controller: 'LpHeadCtrl',
            templateUrl: 'components/landingpage/_head.html'
        };
    })
    .directive('landingInfo', function() {
        return {
            strict: 'EA',
	    controller: 'LpInfoCtrl',
            link: function($scope, $element, $attr) {
            },
            templateUrl: 'components/landingpage/_info.html'
        };
    })
    .directive('landingSb', function() {
        return {
            strict: 'EA',
            templateUrl: 'components/landingpage/_sb.html'
        };
    })
    .directive('landingStatistic', ['$interval', function($interval) {
        return {
            strict: 'EA',
            controller: 'LpStatCtrl',
	    link: function($scope, $element) {
		$scope.users = {
		    ios: 232,
		    android: 408,
		    wp: 0,
		    pc: 312
		};
		
		$scope.users.total = $scope.users.ios + $scope.users.android + $scope.users.pc;
		
		$interval(function() {
		    $scope.users.ios += 1;
		    $scope.users.total += 1;
		    // localStorage.users = angular.toJson($scope.users);
		}, Math.floor(Math.random() * 10 + 10) * 1000);
		
		$interval(function() {
		    $scope.users.android += 1;
		    $scope.users.total += 1;
		    // localStorage.users = angular.toJson($scope.users);
		}, Math.floor(Math.random() * 10 + 10) * 1000);
		
		$interval(function() {
		    $scope.users.pc += 1;
		    $scope.users.total += 1;
		    // localStorage.users = angular.toJson($scope.users);
		}, Math.floor(Math.random() * 10 + 10) * 1000);
	    },
            templateUrl: 'components/landingpage/_statistic.html'
        };
    }])
    .directive('landingSlogan', function() {
        return {
            strict: 'EA',
            templateUrl: 'components/landingpage/_slogan.html'
        };
    })
    .directive('landingComments', function() {
        return {
            strict: 'EA',
            controller: 'LpCommentsCtrl',
            templateUrl: 'components/landingpage/_comment.html'
        };
    })
    .directive('landingFooter', function() {
        return {
            strict: 'EA',
	    controller: 'LpFooterCtrl',
            templateUrl: 'components/landingpage/_footer.html'
        };
    })
    .directive('coursesModal', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    templateUrl: 'components/landingpage/_courses-modal.html'
	};
    });
