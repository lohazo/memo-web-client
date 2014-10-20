'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
    'ngRoute',
    'ngStorage',
    'ngAudio',
    'mm.foundation',
    'angles',
    'facebook',
    'googleplus',
    'app.controllers',
    'app.directives',
    'header',
    'landingpage',
    'login',
    'home',
    'course'
]).config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    'FacebookProvider',
    'GooglePlusProvider',
    AppConfig]);

function AppConfig($routeProvider, $locationProvider,
		   $httpProvider, FacebookProvider, GooglePlusProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.when('/', {
	templateUrl: '_index.html',
	controller: 'AppCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});

    $httpProvider.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded;charset=utf-8';

    $httpProvider.defaults.transformRequest = [function(obj) {
	var str = [];
	for(var p in obj)
	    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
    }];

    FacebookProvider.init({
	appId: '856714854352716',
	version: 'v2.1'
    });

    GooglePlusProvider.init({
	clientId: '76466559980-s5se51atvu7oubctg2afjqkugh1rm65k.apps.googleusercontent.com',
	apiKey: 'AIzaSyAFZYZEDMa92M5x4AywBm_axZC0O2Nr9Dc',
	scopes: 'https://www.googleapis.com/auth/plus.login ' +
	    'https://www.googleapis.com/auth/userinfo.email ' +
	    'https://www.googleapis.com/auth/userinfo.profile'
    });
}
