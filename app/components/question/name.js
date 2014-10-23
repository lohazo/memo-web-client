'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.name', [])
    .controller('QuestionNameCtrl', [
        '$scope',
        '$attrs',
        function($scope, $attrs) {
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
        }])
    .directive('questionName', function() {
        return {
            strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
            controller: 'QuestionNameCtrl',
            link: function($scope) {
            },
            templateUrl: 'skill/lesson/question/question_name.html'
        };
    });
