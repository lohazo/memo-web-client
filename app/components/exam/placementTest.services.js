(function (angular) {

  'use strict';

  function PlacementTestFactory(PlacementServices, Mixpanel, MemoTracker) {
    var PlacementTest = {};

    PlacementTest.start = function (data) {
      return PlacementServices.start(data)
        .then(function (response) {
          PlacementTest.question = response.data;
          MemoTracker.track('start exam placement test');
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

  function PlacementTestServices($http, $q, API) {
    function transformRequest(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }

    return {
      start: function (data) {
        var deferred = $q.defer();

        var requestData = {
          platform: 'web',
          type: 'placement_test',
          auth_token: data.auth_token,
          speak_enabled: false
        };

        $http.post(API + '/adaptive_tests/start', requestData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: transformRequest
          })
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      },
      submitAnswer: function (data) {
        var deferred = $q.defer();

        // var data = {
        //   platform: 'web',
        //   type: 'placement_test',
        //   auth_token: data.auth_token,
        //   speak_enabled: false,
        //   answers: '54ed743a6d61693d7e490000',
        //   exam_token: data.exam_token
        // };

        data.platform = 'web';
        data.speak_enabled = false;
        type: 'placement_test';
        auth_token: data.auth_token;
        // answer = question_log_id : true;
        exam_token: data.exam_token;

        $http.post(API + '/adaptive_tests/submit_answer', data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: transformRequest
          })
          .then(function (response) {
            deferred.resolve(response);
          });

        return deferred.promise;
      }
    };
  }

  angular.module('placement.services', [])
  angular.module('placement.services')
    .factory('PlacementTestFactory', ['PlacementTestServices', 'Mixpanel', 'MemoTracking',
      PlacementTestFactory
    ])
    .factory('PlacementTestServices', ['$http', '$q', 'API', PlacementTestServices]);

}(window.angular));