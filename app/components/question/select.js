'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.select', [])
    .controller('QuestionSelectCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
	    $scope.select = {
		userAnswer: ''
	    };
	}])
    .directive('questionSelect', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
	    controller: 'QuestionSelectCtrl',
	    link: function($scope) {
		$scope.selectAnswer = function(number) {
		    // DOM manipulation

		    var elements = document.querySelectorAll('.selected');
		    var element = document.querySelector('.image.image-' + number);
		    angular.element(elements).removeClass('selected');
		    angular.element(element).addClass('selected');

		    // FIXME: No two-way binding
		    $scope.select.userAnswer = $scope.question.options[number - 1].text;
		    $scope.answer = $scope.select.userAnswer;
		};
	    },
	    templateUrl: 'skill/lesson/question/question_select.html'
	};
    });
