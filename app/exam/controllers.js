'use strict';

angular.module('exam.controllers', [])
    .controller('ExamCtrl', [
	'$scope', '$routeParams', 'Exam',
	function($scope, $routeParams, Exam) {
	    var requestData = {
		skill_id: $routeParams.id,
		lesson_number: $routeParams.lesson_number
	    };

	    Exam.start(requestData);
	}
    ]);
