'use strict';

describe("Services", function () {
  beforeEach(module('ngRoute'));
  beforeEach(module('question.services'));
  beforeEach(function () {
    angular.module('adaptiveTest', []);
    module(function ($provide) {
      $provide.service('AdaptiveTestServices', function ($q, $http) {
        var services = {};
        services.start = function () {

        };
        return services;
      });
    })
  });

  beforeEach(module('adaptiveTest.progressQuiz'));

  describe('ProgressQuiz', function () {
    var progressQuiz, adaptiveTestServices, httpBackend;

    beforeEach(inject(function (_ProgressQuiz_, _AdaptiveTestServices_, _$httpBackend_, $q) {
      progressQuiz = _ProgressQuiz_;
      adaptiveTestServices = _AdaptiveTestServices_;
      httpBackend = _$httpBackend_;
      spyOn(adaptiveTestServices, "start").andCallFake(
        function () {
          var deferred = $q.defer();
          deferred.resolve({
            score: '8/10'
          });
          return deferred.promise;
        });
    }));

    it('should be defined', function () {
      expect(progressQuiz).toBeDefined();
      progressQuiz.start().then(function () {
        expect(progressQuiz.settings).toBeDefined();
      });
    });
  });
});