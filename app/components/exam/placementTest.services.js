(function (angular) {

  'use strict';

  function PlacementTestFactory(PlacementServices, Mixpanel, MemoTracker, $localStorage) {
    var PlacementTest = {};

    PlacementTest.start = function () {
      return PlacementServices.start()
        .then(function (response) {
          PlacementTest.question = response.data;
          MemoTracker.track('start exam placement test');
          $localStorage.placementtest = response.data.placement_test_log_id;
        });
    };

    PlacementTest.skip = function (data) {
      return PlacementServices.submitAnswer(data)
        .then(function (response) {
          PlacementTest.question = response.data;
        });
    };

    PlacementTest.submitAnswer = function (data) {
      return PlacementServices.submitAnswer(data)
        .then(function (response) {
          PlacementTest.question = response.data;
          if (PlacementTest.question.exp_chart) {
            MemoTracker.track('finish exam placement test')
          } else {
            MemoTracker.track('quit exam placement test');
          }

        // PlacementTest.question = {
        //   "finish_exam_bonus_exp": 2680,
        //   "heart_bonus_exp": 0,
        //   "exp_chart": {
        //     "days": ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
        //     "exp": [0, 0, 0, 0, 0, 0, 2680]
        //   },
        //   "combo_days": 1,
        //   "affected_skill": {
        //     "_id": "en-vi_khoa_hoc",
        //     "title": "Khoa học",
        //     "order": 48,
        //     "slug": "Khoa học",
        //     "theme_color": "#33b5e5",
        //     "icon_name": "en-vi_khoa_hoc",
        //     "icon_urls": {}
        //   },
        //   "num_affected_skill": 49,
        //   "leveled_up": true,
        //   "level": 2,
        //   "base_course_id": "en-vi",
        //   "current_course_name": "Tiếng Anh",
        //   "bonus_money_full_heart": 0,
        //   "bonus_money_full_heart_message": "",
        //   "bonus_money": 0
        // };
        });
    }
    return PlacementTest;
  }

  function PlacementTestServices($http, $q, API, $localStorage, $location) {

    return {
      start: function () {
        var deferred = $q.defer();
        var authToken = $localStorage.auth.user.auth_token;
        var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

        var requestData = {
          platform: 'web',
          type: 'placement_test',
          auth_token: authToken,
          speak_enabled: false
        };

        $http.post(API + '/adaptive_tests/start?platform=web&localize=' + localize, requestData)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      },
      submitAnswer: function (data) {
        var deferred = $q.defer();
        var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

        data.auth_token = $localStorage.auth.user.auth_token;
        data.platform = 'web';
        data.speak_enabled = false;
        data.type = 'placement_test';

        $http.post(API + '/adaptive_tests/' + data.id + '/submit_answer?platform=web&localize=' + localize, data)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      }
    };
  }

  angular.module('placement.services', [])
  angular.module('placement.services')
    .factory('PlacementTestFactory', ['PlacementTestServices', 'Mixpanel', 'MemoTracking', '$localStorage',
      PlacementTestFactory
    ])
    .factory('PlacementTestServices', ['$http', '$q', 'API', '$localStorage', '$location', PlacementTestServices]);

}(window.angular));