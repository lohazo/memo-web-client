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
		ios: 0,
		android: 0,
		wp: 0,
		pc: 0,
		total: 0
	    };
	    var upperBound = {
		ios: 232,
		android: 408,
		wp: 72,
		pc: 312
	    };
	    
	    upperBound.total = upperBound.ios + upperBound.android + upperBound.wp + upperBound.pc;

	    $interval(function() {
		$scope.users.total += 1;
		// localStorage.users = angular.toJson($scope.users);
	    }, 2000 / upperBound.total, upperBound.total);
	    
	    $interval(function() {
		$scope.users.ios += 1;
		// localStorage.users = angular.toJson($scope.users);
	    }, 2000 / upperBound.ios, upperBound.ios);
	    
	    $interval(function() {
		$scope.users.android += 1;
		// localStorage.users = angular.toJson($scope.users);
	    }, 2000 / upperBound.android, upperBound.android);
	    
	    $interval(function() {
		$scope.users.wp += 1;
		// localStorage.users = angular.toJson($scope.users);
	    }, 2000 / upperBound.wp, upperBound.wp);
	    
	    $interval(function() {
		$scope.users.pc += 1;
		// localStorage.users = angular.toJson($scope.users);
	    }, 2000 / upperBound.pc, upperBound.pc);
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
