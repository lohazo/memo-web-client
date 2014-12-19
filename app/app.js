(function(angular) {
  'use strict';

  function AppConfig($routeProvider, $locationProvider,
    $httpProvider, FacebookProvider, GooglePlusProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.when('/', {
      templateUrl: '_index.html',
      controller: 'AppCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8';

    $httpProvider.defaults.transformRequest = [function(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }];

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('HttpInterceptor');

    FacebookProvider.init({
      appId: '856714854352716',
      version: 'v2.1'
    });

    GooglePlusProvider.init({
      clientId: '968128090898-e768ucu099tgsn5sli4nms46pp6jttt7.apps.googleusercontent.com',
      apiKey: 'AIzaSyAgi3H6TUcL_3lo6YL4YtZ1HWau0Fs8eog',
      scopes: 'https://www.googleapis.com/auth/plus.login ' +
        'https://www.googleapis.com/auth/userinfo.email ' +
        'https://www.googleapis.com/auth/userinfo.profile'
    });
  }

  // Declare app level module which depends on filters, and services
  angular.module('app', [
    'ngRoute', 'ngStorage', 'ngAudio',
    'mm.foundation', 'angles', 'facebook', 'googleplus',
    'angular-loading-bar',
    'app.controllers', 'app.directives',
    'header', 'landingpage', 'login', 'home', 'course',
    'profile', 'skill', 'placement', 'report', 'exam',
    'feedback', 'settings', 'plaza', 'gamification', 'leaderboard', 'tracking', 'welcome', 'words'
  ]).config(['$routeProvider', '$locationProvider', '$httpProvider', 'FacebookProvider', 'GooglePlusProvider', AppConfig]);

}(window.angular));