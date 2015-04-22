(function (angular) {

  'use strict';

  function JobConfig($routeProvider) {
    $routeProvider.when('/jobs', {
      templateUrl: 'job/_job-list.html',
      controller: 'ListJobCtrl',
      resolve: {
        allJobs: function (JobServices) {
          return JobServices.getJobs();
        },
        hotJobs: function (JobServices) {
          return JobServices.getJobs({
            filter: 'hot'
          })
        },
        allFilter: function (JobServices) {
          return JobServices.getFilter();
        },
        searchJobs: function ($route, $q, JobServices) {
          var deferred = $q.defer();
          if ($route.current.params.keywords) {
            return JobServices.searchJobs($route.current.params);
          }
          deferred.resolve();
          return deferred.promise;
        }
      }
    });

    $routeProvider.when('/jobs/:slug', {
      templateUrl: 'job/_job-detail.html',
      controller: 'JobDetailCtrl',
      resolve: {
        Job: function ($route, JobServices) {
          return JobServices.getJob({
            slug: $route.current.params.slug
          });
        }
      }
    });
  }

  angular.module('job', ['job.services', 'job.controllers'])
    .config(['$routeProvider', JobConfig])
}(window.angular));