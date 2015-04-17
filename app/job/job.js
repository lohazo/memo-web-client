(function (angular) {

  'use strict';

  function JobConfig($routeProvider) {
    $routeProvider.when('/job', {
      templateUrl: 'job/_job-list.html',
    });

    $routeProvider.when('/job/:id', {
      templateUrl: 'job/_job-detail.html',
    });
  }

  angular.module('job', ['job.services', 'job.controllers'])
    .config(['$routeProvider', JobConfig])
}(window.angular));