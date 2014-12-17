'use strict';

angular.module('login.services', [])
.factory('AuthService', [
    '$rootScope', '$localStorage', '$routeParams',
    'Facebook', 'GooglePlus', 'EcoTracking', 'MemoTracking',
    'LoginService', 'MolServices',
    function($rootScope, $localStorage, $routeParams,
        Facebook, GooglePlus, EcoTracker, MemoTracker,
        LoginService, MolServices) {
        var AuthService = function() {};
        AuthService.prototype.register = function(data) {
            return LoginService.register(data).then(loginCallback);
        };

        AuthService.prototype.login = function(data) {
            return LoginService.login(data).then(loginCallback);
        };

        AuthService.prototype.forgetPassword = function(data) {
            return LoginService.forgetPassword(data);
        };
        AuthService.prototype.FbLogin = function() {
            Facebook.getLoginStatus(function(loginStatusResponse) {
                if (loginStatusResponse.status === 'connected') {
                    getFbInfo(loginStatusResponse);
                } else {
                    Facebook.login(function(loginResponse) {
                        if (loginResponse.status === 'unknown' || loginResponse.status === 'not_authorized') {

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
            return GooglePlus.login().then(function(gAuthResult) {
                requestData.g_access_token = gAuthResult.access_token;
                GooglePlus.getUser().then(function(response) {
                    requestData.gmail = response.result.email;
                    LoginService.login(requestData).then(loginCallback);
                });
            });
        };

        AuthService.prototype.checkAuth = function() {
            var data = $localStorage.auth.user;
            return LoginService.checkAuth(data).then(function(response) {
                if (response.data.response_code === 401) {
                    $rootScope.$broadcast('event:auth-invalidToken');
                }
            });
        };

        AuthService.prototype.logout = function() {
            $localStorage.$reset();
            delete $localStorage.displayTour;
            $rootScope.$broadcast('event:auth-logoutConfirmed');
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
            $localStorage.auth = {
                loggedIn: true,
                user: response.data,
                trial: response.data.is_trial
            };

            var data = angular.fromJson(angular.toJson(response.data));
                // data.name = data.username;
                data.name = "memo_" + data._id;
                delete data.auth_token;

            if (response.data.is_newly_sign_up) {
                MemoTracker.track('sign up');
                EcoTracker.track('Web 1.0.2 user logged in', data);
                $localStorage.displayTour = true;
            } else {
                MemoTracker.track('login');
            }
            mixpanel.identify(response.data._id);

                var molData = {};
                molData.code_chanel = $routeParams.code_chanel || -100;
                molData.id_landingpage = $routeParams.id_landingpage || -100;
                molData.id_campaign = $routeParams.id_campaign || -100;
                molData.id_camp_landingpage = $routeParams.id || -100;

                mixpanel.track('Web 1.0.2 user logged in', molData);

                molData.name = data.name || data.username;
                molData.email = data.email;
                molData.phone = '0918537799';

                MolServices.saveC3(molData);

                $rootScope.$broadcast('event:auth-loginConfirmed', {
                    user: response.data
                });
            }
            return new AuthService();
        }
        ])
.factory('LoginService', ['$http', '$q', function($http, $q) {
    var HOST = 'http://api.memo.edu.vn/api',
    API_VERSION = '/v1.5',
    BASE_URL = HOST + API_VERSION;

    return {
        register: function(data) {
            var deferred = $q.defer();
            $http.post(BASE_URL + '/users', data)
            .then(function(authData) {
                deferred.resolve(authData);
            }, function(authData) {
                deferred.reject(authData);
            });
            return deferred.promise;
        },
        login: function(data) {
            var deferred = $q.defer();
            $http.post(BASE_URL + '/users/login', data)
            .then(function(authData) {
                deferred.resolve(authData);
            }, function(authData) {
                deferred.reject(authData);
            });
            return deferred.promise;
        },
        forgetPassword: function(data) {
            var deferred = $q.defer();
            $http.post(BASE_URL + '/users/forget_password', data)
            .then(function(authData) {
                deferred.resolve(authData);
            }, function(authData) {
                deferred.reject(authData);
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
        },

    };
}])
