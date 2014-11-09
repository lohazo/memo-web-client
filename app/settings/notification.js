'use strict';

angular.module('settings.notification', [])
    .factory('SettingServices', ['$http', '$q', function($http, $q) {
	var HOST = "http://api.memo.edu.vn/api",
	    API_VERSION = "/v1.4",
	    BASE_URL = HOST + API_VERSION;

	var Services = {};

	Services.save = function(data) {
	    var deferred = $q.defer();

	    $http.post(BASE_URL + '/users/edit_settings', data)
		.then(function(response) {
		    deferred.resolve(response);
		});

	    return deferred.promise;
	};

	return Services;
    }])
    .factory('SettingNotification', [
	'SettingServices', '$localStorage',
	function(SettingServices, $localStorage) {

	    var Setting = {};

	    Setting.settings = $localStorage.auth.profile_detail.settings;

	    Setting.save = function(data) {
		data.auth_token = $localStorage.auth.user.auth_token;
		return SettingServices.save(data)
		    .then(function(response) {
			console.log(response);
		    });
	    };

	    return Setting;
    }])
    .controller('SettingNotificationCtrl', [
	'$scope', 'SettingNotification',
	function($scope, SettingNotification) {

	    $scope.settings = SettingNotification.settings;

	    $scope.saveChanges = function() {
		var data = {};
		data.setting = $scope.settings.map(function(userSetting) {
		    userSetting.id = userSetting._id;
		    delete userSetting._id;
		    return userSetting;
		});
		data.setting = JSON.stringify($scope.settings);
		SettingNotification.save(data);
	    };
	}
    ]);
