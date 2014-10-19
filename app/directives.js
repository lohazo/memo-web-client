'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.directives', [])
    .directive('home', function() {
	return {
	    restrict: 'EA',
	    replace: true,
	    controller: 'HomeCtrl',
	    templateUrl: 'home/_index.html'
	};
    })
    .directive('landingpage', function() {
	return {
	    restrict: 'EA',
	    replace: true,
	    controller: 'LpCtrl',
	    templateUrl: 'components/landingpage/_index.html'
	};
    });
