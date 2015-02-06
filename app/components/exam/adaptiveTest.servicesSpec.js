'use strict';

describe("Services", function () {

  beforeEach(module('app.services'));
  beforeEach(module('ngStorage'));
  beforeEach(module('adaptiveTest'));
  // beforeEach(module('ngStorage', function ($provider) {
  //   $provider.factory('$localStorage', function () {
  //     var $localStorage = {};
  //     return $localStorage;
  //   });
  // }));

  describe('adaptiveTest', function () {

    var httpBackend, $localStorage, API;
    var services;

    beforeEach(inject(function (AdaptiveTestServices, $httpBackend, _$localStorage_, _API_) {
      services = AdaptiveTestServices;
      httpBackend = $httpBackend;
      $localStorage = _$localStorage_;
      API = _API_;

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/start', {
          'auth_token': '1',
          'platform': 'web',
        }).respond({
        "message": "Adaptive test type không hợp lệ!"
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/start', {
          'auth_token': '1',
          'platform': 'web',
          'type': 'progress_quiz'
        }).respond({
        "progress_quiz_log_id": "54d43e306d61696407010000",
        "current_question": 1,
        "exam_token": "gTyzRDE",
        "question": {
          "type": "judge",
          "question": "Tôi có một trăm trái táo.",
          "hints": [
            "I have a hundred apples.",
            "I have got one hundred apples."
          ],
          "options": [
            "I have got one hundred apples.",
            "They live for eighteen months.",
            "I have a hundred apples."
          ],
          "question_log_id": "54d43e306d61696407000000"
        }
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/undefined/submit_answer', {
          'auth_token': '1',
          'platform': 'web',
          'exam_token': 'gTyzRDE',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).respond({
        "message": "Progress quiz log không hợp lệ!"
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/54d43e306d61696407010000/submit_answer', {
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'exam_token': 'gTyzRDE',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).respond({
        "message": "Adaptive test type không hợp lệ!"
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/54d43e306d61696407010000/submit_answer', {
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'type': 'progress_quiz',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).respond({
        "message": "Exam token không hợp lệ!"
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/54d43e306d61696407010000/submit_answer', {
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'type': 'progress_quiz',
          'exam_token': 'gTyzRDE'
        }).respond({
        "message": "Đáp án không hợp lệ!"
      });

      httpBackend.whenPOST(
        'http://staging.memo.edu.vn/v2/api/adaptive_tests/54d43e306d61696407010000/submit_answer', {
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'type': 'progress_quiz',
          'exam_token': 'gTyzRDE',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).respond({
        "progress_quiz_log_id": "54d43e306d61696407010000",
        "current_question": 2,
        "exam_token": "gXpGnpR",
        "question": {
          "type": "name",
          "hint": "ngọn núi",
          "lang": "en",
          "answer_lang": "vi",
          "question_images": [
            "http://admin.memo.edu.vn/uploads/base_word/image/en/mountain/9a428500-52cb-0132-3f17-002590a51639.jpg",
            "http://admin.memo.edu.vn/uploads/base_word/image/en/mountain/9a5367e0-52cb-0132-a19d-002590a51639.jpg",
            "http://admin.memo.edu.vn/uploads/base_word/image/en/mountain/9a652270-52cb-0132-c8de-002590a51639.jpg"
          ],
          "question_log_id": "54d4416a6d616903be120000"
        }
      });
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
      expect(services).toBeDefined();
    });

    it('should have defined start function', function () {
      expect(services.start).toBeDefined();
    });

    it('should have error message when starting without type', function () {
      $localStorage.auth = {
        user: {
          auth_token: '1'
        }
      };

      services.start({}).then(function (response) {
        expect(response.data.message).toEqual(
          'Adaptive test type không hợp lệ!');
      });

      httpBackend.flush();
    });

    it('should have data when starting with correct data', function () {
      services.start({
        type: 'progress_quiz'
      }).then(function (response) {
        expect(response.data.progress_quiz_log_id).toEqual(
          '54d43e306d61696407010000');
      });

      httpBackend.flush();
    });

    it(
      'should have error message when submitAnswer without, or with a wrong progress_quiz_log_id',
      function () {
        services.submitAnswer({
          'auth_token': '1',
          'platform': 'web',
          'exam_token': 'gTyzRDE',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).then(function (response) {
          expect(response.data.message).toEqual('Progress quiz log không hợp lệ!');
        });

        httpBackend.flush();
      });

    it(
      'should have error message when submitAnswer without, or with a wrong adaptive_test type',
      function () {
        services.submitAnswer({
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'exam_token': 'gTyzRDE',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).then(function (response) {
          expect(response.data.message).toEqual('Adaptive test type không hợp lệ!');
        });

        httpBackend.flush();
      });

    it('should have error message when submitAnswer without, or with a wrong exam_token',
      function () {
        services.submitAnswer({
          '_id': '54d43e306d61696407010000',
          'auth_token': '1',
          'platform': 'web',
          'type': 'progress_quiz',
          'answer': {
            "54d43e306d61696407000000": true
          }
        }).then(function (response) {
          expect(response.data.message).toEqual('Exam token không hợp lệ!');
        });

        httpBackend.flush();
      });

    it('should have error message when submitAnswer without answer', function () {
      services.submitAnswer({
        '_id': '54d43e306d61696407010000',
        'auth_token': '1',
        'platform': 'web',
        'type': 'progress_quiz',
        'exam_token': 'gTyzRDE'
      }).then(function (response) {
        expect(response.data.message).toEqual('Đáp án không hợp lệ!');
      });

      httpBackend.flush();
    });

    it('should have data when submitAnswer with correct data', function () {
      services.submitAnswer({
        '_id': '54d43e306d61696407010000',
        'auth_token': '1',
        'platform': 'web',
        'type': 'progress_quiz',
        'exam_token': 'gTyzRDE',
        'answer': {
          "54d43e306d61696407000000": true
        }
      }).then(function (response) {
        expect(response.data.current_question).toEqual(2);
      });

      httpBackend.flush();
    });
  });
});