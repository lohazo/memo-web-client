'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question.select', [])
    .controller('QuestionSelectCtrl', [
	'$scope',
	'$attrs',
	function($scope, $attrs) {
	    $scope.question = $scope.$parent.question;
	    $scope.options = [];
	    var options = $scope.question.options.slice(0);
	    var target = options.filter(function(option) {
		return option.text === $scope.question.hint;
	    })[0];
	    var idx = options.indexOf(target);
	    options.splice(idx, 1);
	    $scope.options = shuffle([].concat([target, options[0], options[1]]));

	    $scope.select = {
		userAnswer: ''
	    };

	    //+ Jonas Raoni Soares Silva
	    //@ http://jsfromhell.com/array/shuffle [v1.0]
	    function shuffle(o) { //v1.0
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	    };
	}])
    .directive('questionSelect', function() {
	return {
	    strict: 'EA',
	    replace: true,
	    scope: {
		answer: "=answer"
	    },
	    controller: 'QuestionSelectCtrl',
	    link: function($scope) {
		$scope.selectAnswer = function(number) {
		    // DOM manipulation

		    var elements = document.querySelectorAll('.selected');
		    var element = document.querySelector('.image.image-' + number);
		    angular.element(elements).removeClass('selected');
		    angular.element(element).addClass('selected');

		    // FIXME: No two-way binding
		    $scope.select.userAnswer = $scope.question.options[number - 1].text;
		    $scope.question.userAnswer = $scope.select.userAnswer;
		};
	    },
	    templateUrl: 'components/question/_question-select.html'
	};
    });
