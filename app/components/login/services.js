(function (angular) {
  'use strict';

  function LoginFactory($http, $q, $localStorage, API) {
    var Service = {};

    Service.loginProcessing = false;

    Service.register = function (data) {
      var deferred = $q.defer();

      if (!Service.loginProcessing) {
        Service.loginProcessing = true;

        $http.post(API + '/users', data)
          .then(function (response) {
            deferred.resolve(response);
            Service.loginProcessing = false;
          }, function (response) {
            deferred.reject(response);
            Service.loginProcessing = false;
          });
      }

      return deferred.promise;
    };

    Service.login = function (data) {
      var deferred = $q.defer();
      var access_token = data.g_access_token || data.access_token;
      var gmail = data.gmail;

      if (!Service.loginProcessing) {
        Service.loginProcessing = true;

        $http.post(API + '/users/login?access_token=' + access_token, data)
          .then(function (response) {
            deferred.resolve(response);
            Service.loginProcessing = false;
          }, function (response) {
            deferred.reject(response);
            Service.loginProcessing = false;
          });
      }

      return deferred.promise;
    };

    Service.logout = function () {
      var user = $localStorage.auth.user;

      return $http.post(API + '/users/' + user._id + '/logout', {
        auth_token: user.auth_token
      });
    };

    Service.forgetPassword = function (data) {
      var deferred = $q.defer();
      $http.post(API + '/users/forgot_password', data)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });
      return deferred.promise;
    };

    Service.profile = function (data) {
      var deferred = $q.defer();
      $http.get(API + '/users/' + data._id + '?auth_token=' + data.auth_token)
        .then(function (response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    };

    return Service;
  }

  function AuthService($q, $rootScope, $location, $cookies, $localStorage, Facebook, GooglePlus, EcoTracker,
    MemoTracker,
    LoginService, ReferralService) {
    var Service = {};

    Service.checkCode = function (data) {
      return ReferralService.checkCode(data);
    };

    Service.submitReferralCode = function (data) {
      return ReferralService.submitCode(data);
    }

    Service.isAuthenticated = function () {
      if ($localStorage.auth && $localStorage.auth.loggedIn) {
        return true;
      }

      return false;
    };

    Service.register = function (data) {
      return LoginService.register(data).then(loginCallback);
    };

    Service.login = function (data) {
      return LoginService.login(data).then(loginCallback);
    };

    Service.forgetPassword = function (data) {
      return LoginService.forgetPassword(data);
    };

    Service.FbCheckAuth = function () {
      var deferred = $q.defer();

      Facebook.getLoginStatus(facebookLoginStatusReceived);

      function facebookLoginStatusReceived(response) {
        if (response.status === 'connected') {
          $localStorage.auth.facebook = response.authResponse;
          deferred.resolve(response);
        } else {
          deferred.reject(response);
        }
      }

      return deferred.promise;
    };

    Service.FbLogin = function () {
      var deferred = $q.defer();

      if (!$localStorage.auth) $localStorage.auth = {
        loggedIn: false,
        trial: false
      };

      if ($localStorage.auth.facebook) {
        facebookGetInfo();
      } else {
        Facebook.login(facebookLoginCallback, {
          scope: 'public_profile, email, user_friends'
        });
      }

      function facebookLoginCallback(response) {
        if (response.status === 'connected') {
          $localStorage.auth.facebook = response.authResponse;
          facebookGetInfo();
        } else {
          deferred.reject(response);
        }
      }

      function facebookGetInfo() {
        Facebook.api('/me', function (response) {
          var data = {};
          if (response.error) {
            delete $localStorage.auth.facebook;
            deferred.reject(data);
          } else {
            data = {
              access_token: $localStorage.auth.facebook.accessToken,
              facebook_id: response.id
            };
            deferred.resolve(data);
          }
        });
      }

      return deferred.promise;
    };

    Service.GLogin = function () {
      var requestData = {};
      return GooglePlus.login().then(function (gAuthResult) {
        requestData.g_access_token = gAuthResult.access_token;
        GooglePlus.getUser().then(function (response) {
          requestData.gmail = response.result.email;
          LoginService.login(requestData).then(loginCallback);
        });
      });
    };

    Service.logout = function () {
      var hostElements = $location.host().split('.');
      var domain = hostElements.shift().match(/^memo/g) ? $location.host() : hostElements.join('.');
      LoginService.logout().then(function () {
        $localStorage.$reset();
        $localStorage.displayTour = null;
        $localStorage.auth = null;
        $cookies.remove('auth_token', {
          domain: domain
        });
        $rootScope.$broadcast('event:auth-logoutConfirmed');
      });
    };

    function loginCallback(response) {
      $rootScope.$broadcast('event:auth-loginConfirmed', {
        user: response.data
      });

      $localStorage.auth.user = response.data;

      var hostElements = $location.host().split('.');
      var domain = hostElements.shift().match(/^memo/g) ? $location.host() : hostElements.join('.');
      $cookies.put('auth_token', response.data.auth_token, {
        domain: domain
      });

      var data = angular.fromJson(angular.toJson(response.data));
      // data.name = data.username;
      data.name = "memo_" + data._id;
      delete data.auth_token;

      if (response.data.is_newly_sign_up) {
        MemoTracker.track('sign up');
        EcoTracker.track('Web 1.0.3 user logged in', data);
      } else {
        MemoTracker.track('login');
      }
    }

    return Service;
  }

  angular.module('login')
    .factory('LoginService', ['$http', '$q', '$localStorage', 'API', LoginFactory])
    .factory('AuthService', ['$q', '$rootScope', '$location', '$cookies', '$localStorage', 'Facebook', 'GooglePlus',
      'EcoTracking',
      'MemoTracking', 'LoginService', 'ReferralService', AuthService
    ]);
}(window.angular));