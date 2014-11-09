'use strict';

angular.module('settings', [
    'settings.sidebar',
    'settings.account',
    'settings.notification'
]).config(['$routeProvider', '$locationProvider', SettingConfig]);

function SettingConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/setting/account', {
	templateUrl: 'settings/_account.html',
	controller: 'SettingAccountCtrl'
    });
    $routeProvider.when('/setting/notification', {
	templateUrl: 'settings/_notification.html',
	controller: 'SettingNotificationCtrl'
    });
}
