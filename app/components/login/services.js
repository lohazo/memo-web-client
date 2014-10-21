'use strict';

angular.module('login.services', [])
    .factory('AuthService', [
	'$rootScope',
	'$localStorage',
	'Facebook',
	'GooglePlus',
	'LoginService',
	function($rootScope, $localStorage, Facebook, GooglePlus, LoginService) {
	    var AuthService = function() {};
	    AuthService.prototype.register = function(data) {
		LoginService.register(data).then(loginCallback);
	    };

	    AuthService.prototype.login = function(data) {
		LoginService.login(data).then(loginCallback);
	    };

	    AuthService.prototype.FbLogin = function() {
		Facebook.getLoginStatus(function(loginStatusResponse) {
		    if(loginStatusResponse.status === 'connected') {
			getFbInfo(loginStatusResponse);
		    } else {
			Facebook.login(function(loginResponse) {
			    if (loginResponse.status === 'unknown'
				|| loginResponse.status === 'not_authorized') {

				$rootScope('event:auth-loginFailed', {
				    error: "Có lỗi khi đăng nhập bằng Facebook"
				});
			    } else {
				getFbInfo(loginResponse);
			    }
			}, {
			    scope: 'public_profile, email, user_friends'
			});
		    }
		});
	    };

	    AuthService.prototype.GLogin = function() {
		var requestData = {};
		GooglePlus.login().then(function(gAuthResult) {
		    requestData.g_access_token = gAuthResult.access_token;
		    GooglePlus.getUser().then(function(response) {
			requestData.gmail = response.result.email;
			LoginService.login(requestData).then(loginCallback);
		    });
		}, function(err) {
		    $rootScope.$broadcast('event:auth-loginFailed', {
			error: "Có lỗi khi đăng nhập bằng Google"
		    });
		});
	    };

	    AuthService.prototype.checkAuth = function(data) {
		LoginService.checkAuth(data).then(function(response) {
		    if (response.data.response_code === 401) {
			$rootScope.$broadcast('event:auth-invalidToken');
		    }
		});
	    };

	    AuthService.prototype.logout = function() {
		$rootScope.$broadcast('event:auth-logoutConfirmed');
		$localStorage.$reset();
	    };

	    function getFbInfo(data) {
		var requestData = {};
		requestData.fb_access_token = data.authResponse.accessToken;
		Facebook.api('/me', function(user) {
		    requestData.fb_Id = user.id;
		    requestData.fb_name = user.name;
		    LoginService.login(requestData).then(loginCallback);
		});
	    }

	    function loginCallback(response) {
		$rootScope.$broadcast('event:auth-loginConfirmed', {
		    user: response.data
		});
	    }

	    return new AuthService();
	}
    ])
    .factory('LoginService', [ '$http', '$q', function($http, $q) {
	var HOST = 'http://api.memo.edu.vn/api',
	    API_VERSION = '/v1.2',
	    BASE_URL = HOST + API_VERSION;

	return {
	    register: function(data) {
		var deferred = $q.defer();
		$http.post(BASE_URL + '/users', data)
		    .then(function(authData) {
			deferred.resolve(authData);
		    });
		return deferred.promise;
	    },
	    login: function(data) {
		var deferred = $q.defer();
		$http.post(BASE_URL + '/users/login', data)
		    .then(function(authData) {
			deferred.resolve(authData);
		    });
		return deferred.promise;
	    },
	    checkAuth: function(data) {
		var deferred = $q.defer();
		$http.post(BASE_URL + '/users/extendauthtoken', data)
		    .then(function(authData) {
			deferred.resolve(authData);
		    });
		return deferred.promise;
	    },
	    profile: function(data) {
		var deferred = $q.defer();
		$http.get(BASE_URL + '/users/' + data._id + '?auth_token=' + data.auth_token)
		    .then(function(userProfile) {
			deferred.resolve(userProfile);
		    });
		return deferred.promise;
	    }
	};
    }]);