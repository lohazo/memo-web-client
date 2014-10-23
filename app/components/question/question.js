'use strict';

//Bypass jslint
var angular = window.angular || angular;

angular.module('question', [
    'question.select',
    'question.translate',
    'question.judge',
    'question.name',
    'question.listen',
    'question.form',
    'question.speak',
    'question.services'
]);
