(function (angular) {
  'use strict';

  function AppConfig($routeProvider, $locationProvider,
    $httpProvider, FacebookProvider, GooglePlusProvider, $logProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.when('/', {
      templateUrl: '_index.html'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('HttpInterceptor');

    // $logProvider.debugEnabled(false);

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
    'ngRoute', 'ngStorage', 'ngAudio', 'angular.filter',
    'mm.foundation', 'angles', 'facebook', 'googleplus',
    'angular-loading-bar', 'angularMoment', 'angulartics', 'angulartics.google.analytics', 'angularFileUpload',
    'app.controllers', 'app.directives',
    'header', 'landingpage', 'login', 'home', 'course',
    'profile', 'skill', 'report', 'exam',
    'feedback', 'settings', 'plaza', 'gamification', 'leaderboard', 'tracking', 'welcome',
    'words', 'referral', 'question',
    'notification', 'download', 'adsense', 'forum', 'memo.dropdown', 'weakestWord'
  ]).config(['$routeProvider', '$locationProvider', '$httpProvider', 'FacebookProvider',
    'GooglePlusProvider', '$logProvider',
    AppConfig
  ]).run(['$rootScope', '$location', '$localStorage', 'amMoment', function ($rootScope, $location, $localStorage,
    amMoment) {
    amMoment.changeLocale('vi');

    var notRequireLoginPaths = {
      '/': true,
      '/download': true,
      '/forum': true
    };
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if ($localStorage.auth) {
        if (!$localStorage.auth.loggedIn && notRequireLoginPaths[next.originPath]) {
          $location.url('/');
        }
      } else {
        $location.url('/');
      }
    });

    $rootScope.$on("$routeChangeSuccess", function (event) {
      if ($location.search().error && $location.search().error == 401) {
        $localStorage.$reset();
        $localStorage.auth = {
          loggedIn: false,
          trial: false
        }
        $rootScope.$broadcast('event:auth-logoutConfirmed');
        alert('Bạn hoặc ai đó đã đăng nhập vào tài khoản này trên thiết bị khác. Vui lòng đăng nhập lại!');
      }
    });
  }]);

}(window.angular));