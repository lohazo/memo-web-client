'use strict';

angular.module('exam', [
    'exam.controllers',
    'exam.services'
]).config(['$routeProvider', '$locationProvider', ExamConfig]);

function ExamConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/checkpoint/:id', {
	templateUrl: 'exam/_index.html',
	controller: 'ExamCtrl'
    });
    $routeProvider.when('/skill/:id/:lesson_number', {
	templateUrl: 'exam/_index.html',
	controller: 'ExamCtrl'
    });
}
