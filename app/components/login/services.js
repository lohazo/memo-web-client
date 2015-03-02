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

  function AuthService($q, $rootScope, $localStorage, $routeParams, Facebook, GooglePlus,
    EcoTracker, MemoTracker,
    LoginService, MolServices, ReferralService) {
    var Service = {};

    Service.checkCode = function (data) {
      return ReferralService.checkCode(data);
    };

    Service.submitReferralCode = function (data) {
      return ReferralService.submitCode(data);
    }

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
      LoginService.logout().then(function () {
        $localStorage.$reset();
        delete $localStorage.displayTour;
        delete $localStorage.auth;
        $rootScope.$broadcast('event:auth-logoutConfirmed');
      });
    };

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
        EcoTracker.track('Web 1.0.3 user logged in', data);

        var molData = {
          code_chanel: $routeParams.code_chanel || -100,
          id_landingpage: $routeParams.id_landingpage || -100,
          id_campaign: $routeParams.id_campaign || -100,
          id_camp_landingpage: $routeParams.id_campaign || -100,
          name: data.name || data.username,
          email: data.email,
          phone: data.mobile || ''
        };

        MolServices.saveC3(molData);
      } else {
        MemoTracker.track('login');
      }

      $rootScope.$broadcast('event:auth-loginConfirmed', {
        user: response.data
      });
    }
    return Service;
  }

  angular.module('login.services', []);
  angular.module('login.services')
    .factory('LoginService', ['$http', '$q', '$localStorage', 'API', LoginFactory]);
  angular.module('login.services')
    .factory('AuthService', ['$q', '$rootScope', '$localStorage', '$routeParams',
      'Facebook', 'GooglePlus', 'EcoTracking', 'MemoTracking',
      'LoginService', 'MolServices', 'ReferralService', AuthService
    ]);
}(window.angular));