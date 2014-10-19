'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.directives',
    'landingpage',
    'mm.foundation'
]).config(['$routeProvider','$locationProvider', '$httpProvider', AppConfig]);

function AppConfig($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.when('/', {
	templateUrl: '_index.html',
	controller: 'AppCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [function(obj) {
	var str = [];
	for(var p in obj)
	    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
    }];
}
