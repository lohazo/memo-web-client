'use strict';

angular.module('skill', [
    'skill.services',
    'skill.directives',
    'skill.controllers',
    'skill.tree'
]).config([
    '$routeProvider',
    '$locationProvider',
    SkillConfig]);

function SkillConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/skill/:id', {
	templateUrl: 'skill/_skill.html',
	controller: 'SkillCtrl'
    });
}
