'use strict';

angular.module('placement.directives', [])
  .directive('footerQuestion', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'exam/_footer.html'
    };
  })
  .directive('footerFailure', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'exam/_footer-failure.html'
    };
  })
  .directive('footerSuccess', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'exam/_footer-success.html'
    };
  })
  .directive('footerResult', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'exam/_footer-result.html'
    };
  });