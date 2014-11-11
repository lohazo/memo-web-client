'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.judge', [])
    .controller('QuestionJudgeCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    $scope.judge = $scope.$parent.question;
	    $scope.options = $scope.judge.options.map(function(o) {
		return {text: o, checked: false};
	    });
	    $scope.userAnswer = [];
	}
    ])
    .directive('questionJudge', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
	    controller: 'QuestionJudgeCtrl',
	    link: function($scope, $element) {
		$scope.updateUserAnswer = function(option) {
		    $scope.userAnswer = $scope.userAnswer || [];
		    var idx = $scope.userAnswer.indexOf(option.text);
		    if (option.checked && idx < 0) {
			$scope.userAnswer.push(option.text);
		    } else {
			$scope.userAnswer.splice(idx, 1);
		    }
		    $scope.$parent.question.userAnswer = $scope.userAnswer;
		};
	    },
	    templateUrl: 'components/question/_question-judge.html'
	};
    });
