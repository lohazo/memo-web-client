(function (angular) {
  'use strict';

  function questionTranslate() {}

  function QuestionTranslateCtrl($scope) {}

  angular.module('question.translation', [])
    .directive('questionTranslate', questionTranslate)
    .controller('QuestionTranslateCtrl', ['$scope', QuestionTranslateCtrl]);
})