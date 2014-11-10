'use strict';

angular.module('plaza', [
    'plaza.services',
    'plaza.controllers'
]).config(['$routeProvider', PlazaConfig]);

function PlazaConfig($routeProvider) {
    $routeProvider.when('/plaza', {
	templateUrl: 'plaza/_index.html',
	controller: 'PlazaCtrl'
    });
}
