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
     * data = {_id: ,current_step, next_step_token}
     */
    Services.nextStep = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/next_step', data, {
        ignoreLoadingBar: true
      });
    };

    /*
     * data = {_id, current_step}
     */
    Services.claimBonus = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + userId + '/claim_bonus', data);
    };

    /*
     * data = {_id, current_step}
     */
    Services.skip = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/skip', data);
    };

    Services.finish = function () {
      var data = {
        auth_token: $localStorage.auth.user.auth_token
      };

      return $http.post(API + '/tutorial/' + userId + '/finish', data);
    };

    return Services;
  }

  function Welcome(WelcomeServices, Question) {
    var Services = {
      currentScreen: '',
      currentQuestion: {},
      currentData: {
        step: 0,
        question: {},
        answer: {},
        result: {}
      }
    };
    var Screens = ['', 'introScreen', 'dictionaryHintScreen', 'questionTranslateScreen',
      'claimBonusScreen', 'plazaScreen', 'finishScreen'
    ];
    var Settings = {
      header: {
        hide: false,
        right: {
          quitLink: {
            hide: false,
            text: 'Bỏ qua bài hướng dẫn'
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
      Services.currentScreen = '';
      Services.currentStep = 0;
      Services.answeredSteps = 0;
      Services.exam = {};
      Services.currentQuestion = {
        result: -1 // -1: answering, 0: false, 1: true
      };
      // init base Setting
      Services.settings = angular.copy(Settings);
    }

    function updateScreen(currentStep) {
      Services.currentScreen = '';
      Services.currentScreen = Screens[currentStep];
    }

    Services.start = function () {
      init();
      return WelcomeServices.start().then(function (response) {
        Services.exam = response.data;
        Services.answeredSteps += 1;
      });
    };

    Services.answer = function () {
      var result;
      Services.answeredSteps += 1;
      if (Services.currentStep === 1) {
        Services.currentQuestion.result = 1; // true
        Services.settings.footer.rightButtons.continueButton.disable = false;
      } else if (Services.currentStep === 2) {
        result = Question.check(Services.exam.translate_tutorial, Services.currentData.answer
          .text);

        Services.currentQuestion.result = result.result ? 1 : 0;
        Services.currentQuestion.correctAnswer = result.correctAnswer;
        Services.currentQuestion.answerOptions = result.answerOptions;

        Services.settings.footer.rightButtons.continueButton.text = 'Tiếp tục';
        Services.settings.footer.rightButtons.continueButton.disable = true;
      }
    };

    Services.nextStep = function () {
      return WelcomeServices.nextStep({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1,
        next_step_token: Services.exam.next_step_token
      }).then(function (response) {
        Services.currentStep += 1;
        console.log(Services.currentStep);
        Services.exam.next_step_token = response.data.next_step_token;
        Services.currentQuestion.result = -1;
        if (Services.currentStep === 1) {
          Services.settings.footer.rightButtons.continueButton.text = 'Tiếp tục';
          Services.settings.footer.rightButtons.continueButton.disable = true;
          Services.settings.footer.leftButtons.hide = true;
        } else if (Services.currentStep === 2) {
          Services.settings.footer.rightButtons.continueButton.text = 'Kiểm tra';
          Services.settings.footer.rightButtons.continueButton.disable = true;
          Services.settings.footer.leftButtons.hide = false;
        }
      });
    };

    Services.claimBonus = function () {
      return WelcomeServices.claimBonus({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1
      });
    };

    Services.skip = function () {
      return WelcomeServices.skip({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1
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
    .factory('Welcome', ['WelcomeServices', 'Question', Welcome]);
}(window.angular));