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
      if (!data.next_step_token) return;

      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/next_step', data, {
        ignoreLoadingBar: false
      });
    };

    /*
     * data = {_id, current_step}
     */
    Services.claimBonus = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/claim_bonus', data);
    };

    /*
     * data = {_id, current_step}
     */
    Services.skip = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/skip', data);
    };

    /*
     * data = {_id}
     */
    Services.finish = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;

      return $http.post(API + '/tutorial/' + data._id + '/finish', data);
    };

    return Services;
  }

  function Welcome(WelcomeServices, Question, $location, AppSetting) {
    var isLoading = false;
    var Services = {
      currentQuestion: {},
      currentData: {
        step: 0,
        question: {},
        answer: {},
        result: {}
      }
    };

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
      Services.currentStep = 0;
      Services.answeredSteps = 0;
      Services.exam = {};
      Services.currentQuestion = {
        result: -1 // -1: answering, 0: false, 1: true
      };
      // init base Setting
      Services.settings = angular.copy(Settings);
    }

    Services.start = function () {
      init();
      isLoading = true;
      return WelcomeServices.start().then(function (response) {
        Services.exam = response.data;
        Services.settings.footer.rightButtons.continueButton.text =
          'Bắt đầu bài hướng dẫn';
        Services.settings.footer.rightButtons.continueButton.disable = false;
        Services.settings.footer.leftButtons.hide = true;
        Services.answeredSteps += 1;
        isLoading = false;
        // Services.currentStep = 3;
        // Services.currentData.claimedBonus = true;
      }, function (response) {
        $location.url('/');
        AppSetting.disableTour();
      });
    };

    Services.answer = function () {
      var result;

      if (Services.answeredSteps <= Services.currentStep) {
        Services.answeredSteps += 1;
      }

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
      if (isLoading) return;

      if (Services.settings.footer.rightButtons.continueButton.disable) {
        return;
      }

      isLoading = true;

      return WelcomeServices.nextStep({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1,
        next_step_token: Services.exam.next_step_token
      }).then(function (response) {
        Services.currentStep += 1;
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
        } else if (Services.currentStep === 3) {
          Services.settings.footer.hide = true;
          Services.settings.header.right.quitLink.hide = true;
        } else if (Services.currentStep === 4) {
          Services.settings.footer.rightButtons.hide = true;
          Services.settings.header.right.memoCoin.hide = true;
          Services.answeredSteps += 1;
        }

        isLoading = false;
      });
    };

    Services.claimBonus = function () {
      if (isLoading) return;

      return WelcomeServices.claimBonus({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1
      }).then(function (response) {
        Services.exam.next_step_token = response.data.next_step_token;
        Services.currentData.claimedBonus = true;
        Services.settings.footer.hide = false;
        Services.settings.header.right.memoCoin.hide = false;
        Services.answeredSteps += 1;
      });
    };

    Services.skip = function () {
      if (isLoading) return;

      return WelcomeServices.skip({
        _id: Services.exam._id,
        current_step: Services.currentStep + 1
      }).then(function (response) {
        init();
        AppSetting.disableTour();
        $location.path('/');
      });
    };

    Services.finish = function () {
      if (isLoading) return;

      return WelcomeServices.finish({
        _id: Services.exam._id
      }).then(function (response) {
        init();
        AppSetting.disableTour();
        $location.url('/');
      });
    };

    return Services;
  }

  angular.module('welcome.services', []);
  angular.module('welcome.services')
    .factory('WelcomeServices', ['$http', '$localStorage', 'API', WelcomeServices])
    .factory('Welcome', ['WelcomeServices', 'Question', '$location', 'AppSetting', Welcome]);
}(window.angular));