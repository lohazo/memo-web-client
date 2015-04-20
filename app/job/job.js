(function (angular) {

  'use strict';

  function JobConfig($routeProvider) {
    $routeProvider.when('/jobs', {
      templateUrl: 'job/_job-list.html',
      controller: 'ListJobCtrl',
      resolve {
        allJobs: function (JobServices) {
          return JobServices.getJobs();
        },
        newJobs: function (JobServices) {
          return JobServices.getJobs({
            filter: 'new'
          })
        },
        hotJobs: function (JobServices) {
          return JobServices.getJobs({
            filter: 'hot'
          })
        },
        searchJobs: function ($route, $q, ForumServices) {
        }
      }
    });

    $routeProvider.when('/jobs/:slug', {
      templateUrl: 'job/_job-detail.html',
      controller: 'JobDetailCtrl',
    });
  }

  angular.module('job', ['job.services', 'job.controllers'])
    .config(['$routeProvider', JobConfig])
}(window.angular));