'use strict';

angular.module('skill.directives', [])
    .directive('skillCell', function() {
	return {
	    restrict: 'EA',
	    scope: true,
	    replace: true,
	    template: '<div></div>'
	};
    });
