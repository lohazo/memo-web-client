'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.directives', [])
  .directive('home', function() {
    return {
      restrict: 'EA',
      controller: 'HomeCtrl',
      templateUrl: 'home/_index.html'
    };
  })
  .directive('appHeader', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      controller: 'HeaderCtrl',
      templateUrl: 'components/header/_header.html'
    };
  })
  .directive('appFacebookShareContent', function(){
    return {
      restrict: 'EA',
      link: function($scope, $element, $attr){
        $element.bind('click', function(data){
          FB.ui({
            method: 'share',
            href: 'http://memo.edu.vn'
          }, function(response){});
        })
      }
        };
  })
  .directive('landingpage', function() {
    return {
      restrict: 'EA',
      controller: 'LpCtrl',
      templateUrl: 'components/landingpage/_index.html'
    };
  });