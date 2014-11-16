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
	    if ($scope.translate.normal_question_audio) {
		var normalFile = ngAudio.load($scope.translate.normal_question_audio);

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
	    link: function($scope, $element) {
		$element.find('textarea').eq(0)[0].focus();
		$element.on('keydown', function(e) {
		    if (e.keyCode === 13) {
			if ($scope.answer && $scope.answer.length > 0) {
			    e.preventDefault();
			    $element.find('textarea').eq(0).attr('readonly', 'readonly');
			}
		    }
		});
	    },
	    controller: 'QuestionTranslateCtrl',
	    templateUrl: 'components/question/_question-translate.html'
	};
    });
