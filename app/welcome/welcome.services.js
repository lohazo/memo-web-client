(function (angular) {
  'use strict';

  function WelcomeServices($http, $localStorage, API) {
    var Services = {};

    Services.start = function () {
      var data = {
        auth_token: $localStorage.auth.user.auth_token,
        current_course_id: $localStorage.auth.user.current_course_id
      };

      return $http.get(API + '/tutorial/start?platform=web&current_course_id=' + data.current_course_id +
        '&auth_token=' + data.auth_token);
    };

    /*
     * data = {current_step, next_step_token}
     */
    Services.nextStep = function (data) {
      var userId = $localStorage.auth.user._id;
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + userId + '/next_step', data);
    };

    /*
     * data = {current_step}
     */
    Services.claimBonus = function (data) {
      var userId = $localStorage.auth.user._id;
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + userId + '/claim_bonus', data);
    };

    /*
     * data = {current_step}
     */
    Services.skip = function (data) {
      var userId = $localStorage.auth.user._id;
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + userId + '/skip', data);
    };

    Services.finish = function () {
      var data = {
        auth_token: $localStorage.auth.user.auth_token
      };

      return $http.post(API + '/tutorial/' + userId + '/finish', data);
    };

    return Services;
  }

  function Welcome(WelcomeServices) {
    var Services = {};
    var Settings = {
      header: {
        hide: false
        right: {
          quitLink: {
            hide: false,
            text: ''
          },
          memoCoin: {
            hide: true,
            text: ''
          }
        }
      },
      footer: {
        hide: false,
        hideTooltips: false,
        leftButtons: {
          hide: false,
          reportButton: {
            hide: false
          },
          forumButton: {
            hide: false
          }
        },
        rightButtons: {
          hide: false,
          continueButton: {
            hide: false,
            disable: false,
            text: ''
          }
        }
      },
      disableDictionary: false
    }

    function init() {
      // currentStep = ant's position
      Services.currentStep = 0;
      Services.answeredSteps = 0;
      Services.exam = {};
      // init base Setting
      Services.settings = angular.copy(Settings);
    }

    Services.start = function () {
      init();
      return WelcomeServices.start().then(function (response) {
        Services.exam = response.data;
        Services.currentStep += 1;
      });
    };

    Services.answer = function () {
      Services.answeredSteps += 1;
    };

    Services.nextStep = function () {
      return WelcomeServices.nextStep({
        current_step: Services.currentStep,
        next_step_token: Services.exam.next_step_token
      }).then(function (response) {
        Services.currentStep += 1;
        Services.next_step_token = response.data.next_step_token;
      })
    };

    Services.claimBonus = function () {
      return WelcomeServices.claimBonus({
        current_step: Services.currentStep
      });
    };

    Services.skip = function () {
      return WelcomeServices.skip({
        current_step: Services.currentStep
      }).then(function (response) {
        init();
      });
    };

    Services.finish = function () {
      init();
      return WelcomeServices.finish();
    };

    return Services;
  }

  angular.module('welcome.services', []);
  angular.module('welcome.services')
    .factory('WelcomeServices', ['$http', '$localStorage', 'API', WelcomeServices])
    .factory('Welcome', ['WelcomeServices', Welcome]);
}(window.angular));