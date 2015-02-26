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
          // question = {
          //     "finish_exam_bonus_exp": 0,
          //     "leveled_up": false,
          //     "heart_bonus_exp": 3,
          //     "exp_chart": {
          //  "days": ["Sa","Su","Mo","Tu","We","Th","Fr"],
          //  "exp": [0,0,0,0,1010,0,0]
          //     },
          //     "combo_days": 1,
          //     "affected_skill": {
          //  "_id": "en-vi_dai_tu_quan_he",
          //  "order": 1,
          //  "title": "Đại từ quan hệ",
          //  "slug": "Đại từ Q.hệ",
          //  "theme_color": "#99cc00"
          //     },
          //     "num_affected_skills": 37,
          //     "bonus_coin": 2
          // };
        });
    }
    return PlacementTest;
  }

  function PlacementTestServices($http, $q, API, $localStorage) {

    return {
      start: function () {
        var deferred = $q.defer();
        var authToken = $localStorage.auth.user.auth_token;

        var requestData = {
          platform: 'web',
          type: 'placement_test',
          auth_token: authToken,
          speak_enabled: false
        };

        $http.post(API + '/adaptive_tests/start', requestData)
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      },
      submitAnswer: function (data) {
        var deferred = $q.defer();

        data.auth_token = $localStorage.auth.user.auth_token;
        data.platform = 'web';
        data.speak_enabled = false;
        data.type = 'placement_test';

        $http.post(API + '/adaptive_tests/' + data.id + '/submit_answer', data)
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
    .factory('PlacementTestServices', ['$http', '$q', 'API', '$localStorage', PlacementTestServices]);

}(window.angular));