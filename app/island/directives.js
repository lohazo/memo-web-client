(function (angular) {
  'use strict';

  angular.module('island.directives', [])
    .directive('newSkill', function() {
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      template: '<svg><polygon class="hex" points="42,0 80,0 110,24 122,60 110,98 80,120 42,120 12,98 0,60 12,24" stroke="{{skill.theme_color}}" fill="{{skill.theme_color}}"></polygon></svg> '
    };
  })
}(window.angular));