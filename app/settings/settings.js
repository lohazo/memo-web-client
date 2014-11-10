'use strict';

angular.module('settings', [
    'settings.sidebar',
    'settings.account',
    'settings.profile',
    'settings.languages',
    'settings.notification'
]).config(['$routeProvider', '$locationProvider', SettingConfig]);

function SettingConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/setting/account', {
	templateUrl: 'settings/_account.html',
	controller: 'SettingAccountCtrl'
    });
    $routeProvider.when('/setting/profile', {
	templateUrl: 'settings/_profile.html',
	controller: 'SettingProfileCtrl'
    });
    $routeProvider.when('/setting/languages', {
	templateUrl: 'settings/_languages.html',
	controller: 'SettingLanguageCtrl'
    });
    $routeProvider.when('/setting/notification', {
	templateUrl: 'settings/_notification.html',
	controller: 'SettingNotificationCtrl'
    });
}
