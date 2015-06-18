(function (angular) {
  'use strict';

  function AdaptiveTestServices($http, $localStorage, API, $location) {
    var Services = {};
    var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

    /*
     * data = {type: progess_quiz/placement_test}
     */
    Services.start = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;
      data.platform = 'web';

      return $http.post(API + '/adaptive_tests/start?platform=web&localize=' + localize, data);
    };

    /*
     * data = {_id: progress_quiz_log_id, exam_token, answer:{question_log_id: true/false}, type}
     */
    Services.submitAnswer = function (data) {
      data.auth_token = $localStorage.auth.user.auth_token;
      data.platform = 'web';

      return $http.post(API + '/adaptive_tests/' + data._id + '/submit_answer?platform=web&localize=' + localize, data);
    }

    return Services;
  }

  angular.module('adaptiveTest', []);
  angular.module('adaptiveTest')
    .factory('AdaptiveTestServices', ['$http', '$localStorage', 'API', '$location', AdaptiveTestServices]);
}(window.angular));