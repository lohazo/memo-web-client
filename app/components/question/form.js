'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.form', [])
    .controller('QuestionFormCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    // FIXME: Better code logic
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
	    $scope.position = -1;
	    $scope.question.question.some(function(token, i) {
		$scope.position = i;
		$scope.tokens = token;
		return (token instanceof Array);
	    });
	    $scope.question = $scope.question.question.splice(0, $scope.position).concat(
			$scope.question.question.splice($scope.position));
	    $scope.answer = {
		selected: $scope.tokens[0]
	    };
	    $scope.$watch('answer.selected', function() {
		$scope.$parent.exam.currentQuestion.userAnswer = $scope.answer.selected;
	    });
	}])
    .directive('questionForm', function() {
	return {
	    strict: 'EA',
	    scope: {},
	    controller: 'QuestionFormCtrl',
	    templateUrl: 'skill/lesson/question/question_form.html'
	};
    });
