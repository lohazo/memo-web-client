'use strict';

angular.module('exam.controllers')
    .controller('ShortcutCtrl', [
	'$scope', , '$routeParams', '$location', 'Exam', 'Question',
	function($scope, $timeout, $routeParams, $location, Exam, Question) {
	    var requestData = {
		skill_id: $routeParams.id,
		lesson_number: $routeParams.lesson_number,
		type: 'shortcut'
	    };
	}]);
