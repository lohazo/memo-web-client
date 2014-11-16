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

		$element.attr('tabindex', '0');
		$element[0].focus();
		$element.on('keyup', function(event) {
		    if (event.keyCode === 97) {
			$scope.options[0].checked = !$scope.options[0].checked;
			$scope.updateUserAnswer($scope.options[0]);
		    } else if (event.keyCode === 98) {
			$scope.options[1].checked = !$scope.options[1].checked;
			$scope.updateUserAnswer($scope.options[1]);
		    } else if (event.keyCode === 99) {
			$scope.options[2].checked = !$scope.options[2].checked;
			$scope.updateUserAnswer($scope.options[2]);
		    }
		});
	    },
	    templateUrl: 'components/question/_question-judge.html'
	};
    });
