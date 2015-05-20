(function (angular) {

  'use strict';

  function HttpInterceptor($rootScope, $q, $location, $localStorage) {
    var canceller = $q.defer();
    return {
      // optional method
      'request': function (config) {
        if (config.url.indexOf('http://') === 0) {
          config.timeout = canceller.promise;
        }
        return config;
      },

      // optional method
      'requestError': function (rejection) {
        // do something on error

        // if (canRecover(rejection)) {
        //     return responseOrNewPromise
        // }
        return $q.reject(rejection);
      },

      // optional method
      'response': function (response) {
        // do something on success
        if (response.status === 401) {
          $localStorage.$reset();
        }
        return response;
      },

      // optional method
      'responseError': function (rejection) {
        // do something on error
        if (rejection.status === 401) {
          $location.url('/?error=401');
        }
        return $q.reject(rejection);
      }
    };
  }

  function AppSetting($localStorage, AppServices, WordsFactory, $rootScope) {
    var Setting = {};
    Setting.sharedSettings = $localStorage.appSharedSettings || null;

    Setting.get = function () {
      return AppServices.get()
        .then(function (response) {
          $localStorage.appSetting = response.data;
        });
    };

    Setting.getSharedSettings = function () {
      return AppServices.getSharedSettings()
        .then(function (response) {
          $localStorage.appSharedSettings = response.data;
          Setting.sharedSettings = response.data;
          $rootScope.$broadcast('getSharedSettings', $localStorage.appSharedSettings);
        });
    };

    Setting.getWords = function () {
      return WordsFactory.getWords()
        .then(function () {
          Setting.words = $localStorage.words;
        });
    };

    Setting.getFinishSkillFacebookContent = function (skillId) {
      return AppServices.getFacebookSharedContent({
        skill_id: skillId
      });
    };

    Setting.getLevelUpFacebookContent = function () {
      return AppServices.getFacebookSharedContent({
        level_up: true,
      });
    };

    Setting.getMaxSkillFacebookContent = function () {
      return AppServices.getFacebookSharedContent({
        max_skill: true,
      });
    };

    Setting.getReferralShareFacebookContent = function (referralCode) {
      return AppServices.getFacebookSharedContent({
        referral_code: referralCode
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

  function AppServices($http, $q, $localStorage, API) {
    var AppServices = {};

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

    AppServices.getFacebookSharedContent = function (data) {
      // data = {skill_id: 'aoheusantheu' / level_up: true};
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;
      var baseCourseId = $localStorage.auth.user.current_course_id;

      var endpoint = API + '/shared_settings/facebook_share_content?device=web&auth_token=' +
        authToken + '&base_course_id=' + baseCourseId;
      if (data.skill_id) {
        endpoint += '&skill_id=' + data.skill_id;
      } else if (data.level_up) {
        endpoint += '&level_up=' + data.level_up;
      } else if (data.referral_code) {
        endpoint += '&referral=true';
      } else if (data.max_skill) {
        endpoint += '&max_skill=' + data.max_skill;
      }

      $http.get(endpoint)
        .then(function (response) {
          // response = {caption:, description:, link:};
          deferred.resolve(response);
        })
        .then(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return AppServices;
  }

  function Message(MessageService) {
    var Message = {};

    Message.list = function () {
      return MessageService.list().then(function (response) {
        Message.messages = response.data;
      });
    };

    Message.open = function (data) {
      // data = {message_ids=[]}
      return MessageService.openMessage(data);
    };

    return Message;
  }

  function MessageService($http, $q, $localStorage, API) {
    MessageService = {};

    MessageService.list = function () {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      $http.get(API + '/messages?platform=web&auth_token=' + authToken)
        .then(function (response) {
          $localStorage.messages = response.data;
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    MessageService.openMessage = function (data) {
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      var requestData = {
        message_ids: JSON.stringify(data.message_ids),
        auth_token: authToken,
        platform: 'web'
      };

      $http.post(API + '/messages/open_messages', requestData)
        .then(function (response) {
          $localStorage.messages = [];
          deferred.resolve(response);
        });

      return deferred.promise;
    };
    return MessageService;
  }

  angular.module('app.services', [])
    .constant('APP_VERSION', '1.0.3')
    .factory('API', ['$location', function ($location) {
      var host = $location.host();
      return host.match(/(^memo.|.edu.vn$)/g) ? '//services.memo.edu.vn/v2/api' : '//staging.memo.edu.vn/v2/api'
    }])
    .constant('angularMomentConfig', {
      preprocess: 'unix',
      timezone: 'Asia/Hanoi'
    })
    .factory('HttpInterceptor', ['$rootScope', '$q', '$location', '$localStorage',
      HttpInterceptor
    ])
    .factory('AppSetting', ['$localStorage', 'AppServices', 'Words', '$rootScope', AppSetting])
    .factory('AppServices', ['$http', '$q', '$localStorage', 'API', AppServices])
    .factory('Message', ['MessageService', Message])
    .factory('MessageService', ['$http', '$q', '$localStorage', 'API', MessageService])
}(window.angular));