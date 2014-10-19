'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.directives', [])
    .directive('home', function() {
	return {
	    restrict: 'EA',
	    replace: true,
	    templateUrl: 'home/_index.html'
	};
    })
    .directive('landingpage', function() {
	return {
	    restrict: 'EA',
	    replace: true,
	    template: '<div>Landing page</div>'
	};
    });
