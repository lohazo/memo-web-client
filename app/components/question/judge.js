'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.judge', [])
    .controller('QuestionJudgeCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
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
	    link: function($scope) {
		$scope.selectAnswer = function(option) {
		    var index = $scope.userAnswer.indexOf(option);

		    index > -1 ? $scope.userAnswer.splice(index, 1)
			       : $scope.userAnswer.push(option);

		    // DOM manipulation
		    var idx, element;
		    idx = $scope.question.options.indexOf(option);
		    element = document.querySelector('.answer.answer-' + (idx + 1));

		    (index > -1) ? angular.element(element).removeClass('checked')
				 : angular.element(element).addClass('checked');

		    $scope.$parent.exam.currentQuestion.userAnswer = $scope.userAnswer;

		};
	    },
	    templateUrl: 'skill/lesson/question/question_judge.html'
	};
    });
