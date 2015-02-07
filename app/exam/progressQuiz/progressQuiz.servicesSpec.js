'use strict';

describe("Services", function () {
  beforeEach(module('app.services'));
  beforeEach(module('ngStorage'));
  beforeEach(module('adaptiveTest'));
  // beforeEach(module('adaptiveTest', function ($provider, $routeProvider) {
  //   $provide.factory('AdaptiveTestServices', function () {
  //     return {};
  //   });
  // }));

  beforeEach(module('adaptiveTest.progressQuiz'));

  describe('ProgressQuiz', function () {
    var progressQuiz, adaptiveTestServices;

    beforeEach(inject(function (ProgressQuiz, AdaptiveTestServices) {
      progressQuiz = ProgressQuiz;
    }));

    it('should be defined', function () {
      expect(progressQuiz).toBeDefined();
    });

    it('should have no di', function () {
      progressQuiz.start().then(function () {
        console.log(progressQuiz.progressQuizLogId);
        expect(progressQuiz.settings).toBeDefined();
      });
    });
  });
});