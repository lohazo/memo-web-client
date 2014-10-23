'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.translate', [])
    .controller('QuestionTranslateCtrl', [
	'$scope',
	'$attrs',
	'ngAudio',
	function($scope, $attrs, ngAudio) {
	    $scope.question = $scope.$parent.exam.currentQuestion.question;
	    var normalFile = ngAudio.load($scope.question.normal_question_audio);
	    $scope.speaker = {
		play: function() {
		    normalFile.play();
		}
	    };

	    $scope.speaker.play();
	}])
    .directive('questionTranslate', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: '=answer'
	    },
	    link: function($scope) {

	    },
	    controller: 'QuestionTranslateCtrl',
	    templateUrl: 'skill/lesson/question/question_translate.html'
	};
    });
