(function (angular) {
  'use strict';

  function ExamQuitLink($location) {
    return {
      strict: 'EA',
      replace: true,
      template: '<a title="">Thoát</a>',
      scope: true,
      link: function ($scope, $element, $attrs) {
        $element.bind('click', function () {
          if (confirm('Are you sure?')) {
            $location.url('/');
          }
        });
      }
    };
  }

  angular.module('exam.directives', []);
  angular.module('exam.directives')
    .directive('examQuitLink', ['$location', ExamQuitLink]);
}(window.angular));