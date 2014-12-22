(function(angular) {

  'use strict';

  function HttpInterceptor($rootScope, $q, $window, $localStorage) {
    return {
      // optional method
      'request': function(config) {
        // do something on success
        return config;
      },

      // optional method
      'requestError': function(rejection) {
        // do something on error

        // if (canRecover(rejection)) {
        //     return responseOrNewPromise
        // }
        return $q.reject(rejection);
      },

      // optional method
      'response': function(response) {
        // do something on success
        if (response.status === 401) {
          $localStorage.$reset();
          alert(response.data.error);
          $window.location = '/';
        }
        return response;
      },

      // optional method
      'responseError': function(rejection) {
        // do something on error
        if (rejection.status === 401) {
          $localStorage.$reset();
          $rootScope.$broadcast('event:auth-logoutConfirmed')
          alert(rejection.data.error);
          $window.location = '/';
        }
        return $q.reject(rejection);
      }
    };
  }

  function AppSetting($localStorage, AppServices, WordsFactory) {
    var Setting = {};
    Setting.sharedSettings = $localStorage.appSharedSettings || null;

    Setting.get = function () {
      return AppServices.get()
        .then(function(response) {
          $localStorage.appSetting = response.data;
        });
    };

    Setting.getSharedSettings = function () {
      return AppServices.getSharedSettings()
        .then(function(response) {
          $localStorage.appSharedSettings = response.data;
          Setting.sharedSettings = response.data;
        });
    };

    Setting.getWords = function () {
      return WordsFactory.getWords()
        .then(function () {
          Setting.words = $localStorage.words;
        });
    };

    Setting.shouldDisplayTour = function () {
      Setting.displayTour = $localStorage.displayTour || false;
      return Setting.displayTour;
    };

    Setting.disableTour = function () {
      Setting.displayTour = false;
      $localStorage.displayTour = false;
    };

    return Setting;
  }

  function AppServices($http, $q, $localStorage, API, API_PHP) {
    var AppServices = {};
    AppServices.get = function(data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API_PHP + '/appsettings?device=web&auth_token=' + authToken )
        .then(function(response) {
          deferred.resolve(response);
        });
      return deferred.promise;
    };

    AppServices.getSharedSettings = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API + '/shared_settings?device=web&resolution=all&auth_token=' + authToken)
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return AppServices;
  }

  function Message(MessageService) {
    var Message = {};

    Message.list = function() {
      return MessageService.list().then(function(response) {
        Message.messages = response.data;
      });
    };

    Message.open = function(data) {
      // data = {message_ids=[]}
      return MessageService.openMessage(data);
    };

    return Message;
  }

  function MessageService($http, $q, $localStorage, API) {
      MessageService = {};

    MessageService.list = function() {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API + '/messages?auth_token=' + authToken)
        .then(function(response) {
          $localStorage.messages = response.data;
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    MessageService.openMessage = function(data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      var requestData = {
        message_ids: JSON.stringify(data.message_ids),
        auth_token: authToken
      };

      $http.post(API + '/messages/open_messages', requestData)
        .then(function(response) {
          $localStorage.messages = [];
          deferred.resolve(response);
        });

      return deferred.promise;
    };
    return MessageService;
  }

  angular.module('app.services', [])
    .constant('APP_VERSION', '1.0.2')
    .constant('API_PHP', 'http://api.memo.edu.vn/api/v1.7')
    .constant('API', 'http://services.memo.edu.vn/api')
    .factory('HttpInterceptor', ['$rootScope', '$q', '$window', '$localStorage', HttpInterceptor])
    .factory('AppSetting', ['$localStorage', 'AppServices', 'Words', AppSetting])
    .factory('AppServices', ['$http', '$q', '$localStorage', 'API', 'API_PHP', AppServices])
    .factory('Message', ['MessageService', Message])
    .factory('MessageService', ['$http', '$q', '$localStorage', 'API', MessageService])
}(window.angular));