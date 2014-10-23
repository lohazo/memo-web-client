'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.translate', [])
    .controller('QuestionTranslateCtrl', [
	'$scope',
	'$attrs',
	'ngAudio',
	function($scope, $attrs, ngAudio) {
	    $scope.translate = $scope.$parent.question;
	    if ($scope.translate.question.normal_question_audio) {
		var normalFile = ngAudio.load($scope.translate.question.normal_question_audio);

		$scope.speaker = {
		    play: function() {
			normalFile.play();
		    }
		};
		$scope.speaker.play();
	    }
	}])
    .directive('questionTranslate', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: '='
	    },
	    link: function($scope) {

	    },
	    controller: 'QuestionTranslateCtrl',
	    templateUrl: 'components/question/_question-translate.html'
	};
    });
