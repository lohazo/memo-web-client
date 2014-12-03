'use strict';
angular.module('message.directives', [])
    .directive('appMain', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: 'HomeMainCtrl',
	    templateUrl: 'message/_messages.html'
	};
    });
