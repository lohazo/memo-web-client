'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.listen', [])
    .controller('QuestionListenCtrl', [
	'$scope',
	'$attrs',
	'ngAudio',
	function($scope, $attrs, ngAudio) {
	    $scope.listen = $scope.$parent.question;
	    var normalFile = ngAudio.load($scope.listen.normal_question_audio),
		slowFile = ngAudio.load($scope.listen.slow_question_audio);

	    $scope.speaker = {
		play: function() {
		    normalFile.play();
		},
		slowPlay: function() {
		    slowFile.play();
		}
	    };

	    $scope.speaker.play();
	}])
    .directive('questionListen', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
	    controller: 'QuestionListenCtrl',
	    link: function($scope) {
	    },
	    templateUrl: 'components/question/_question-listen.html'
	};
    });
