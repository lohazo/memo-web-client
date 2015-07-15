(function (angular) {
  'use strict';

  angular.module('forum.directives', [])
    .directive('forumMainRight', function () {
      return {
        strict: 'EA',
        controller: 'ListPostCtrl',
        templateUrl: 'forum/_main_right.html'
      };
    });
}(window.angular));