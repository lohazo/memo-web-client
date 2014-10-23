'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.judge', [])
    .controller('QuestionJudgeCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    $scope.judge = $scope.$parent.question;
	    $scope.userAnswer = [];
	    $scope.updateUserAnswer = function(option) {
		$scope.userAnswer = $scope.userAnswer || [];
		if (option) {
		    if ($scope.userAnswer.indexOf(option) < 0) {
			$scope.userAnswer.push(option.userAnswer);
		    }
		}
	    };
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
	    link: function($scope) {
		$scope.selectAnswer = function(option) {

		};
	    },
	    templateUrl: 'components/question/_question-judge.html'
	};
    });
