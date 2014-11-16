'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.name', [])
    .controller('QuestionNameCtrl', [
        '$scope',
        '$attrs',
        function($scope, $attrs) {
	    $scope.question = $scope.$parent.question;
        }])
    .directive('questionName', function() {
        return {
            strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
            controller: 'QuestionNameCtrl',
            link: function($scope, $element) {
		$element[0].querySelector('input[type="text"]').focus();
		$element.on('keydown', function(e) {
		    if (e.keyCode === 13) {
			if ($scope.answer && $scope.answer.length > 0) {
			    e.preventDefault();
			    $element[0].querySelector('input[type="text"]').setAttribute('readonly', 'readonly');
			}
		    }
		});
            },
            templateUrl: 'components/question/_question-name.html'
        };
    });
