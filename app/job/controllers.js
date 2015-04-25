(function (angular) {
  'use strict';


  function ListJobCtrl ($scope, $location, JobServices, JobsOfMemo, JobsForUser, allFilter, searchJobs) {
    $scope.max_page = 5;
    $scope.JobsOfMemo = JobsOfMemo.data;
    $scope.JobsForUser = JobsForUser.data;
    $scope.list_fields = allFilter.data.filter_by_fields;
    $scope.list_locations = allFilter.data.filter_by_locations;

    if (!JobsForUser.data.message) {
      $scope.tabs = [{
        title: allFilter.data.filter.for_user,
        data: $scope.JobsForUser,
        active: true
      },
      {
        title: allFilter.data.filter.memo_td,
        data: $scope.JobsOfMemo,
        active: false
      }];
    } else {
      $scope.tabs = [{
        title: allFilter.data.filter.memo_td,
        data: $scope.JobsOfMemo,
        active: true
      }];
    };

    if ($location.search().keywords || $location.search().filter_by_fields || $location.search().filter_by_locations) {
      $scope.searchJobs = searchJobs.data;
      $scope.tabs[0].active = false;
      $scope.tabs.push({
        title: allFilter.data.filter.search,
        data: $scope.searchJobs,
        active: true
      });
    }

    $scope.jobSearch = {
      keywords: '',
      filter_by_fields: '',
      filter_by_locations: ''
    };

    $scope.setPage = function (page) {
      var search = {
        page: page
      };
      if ($location.search().keywords) {
        search.keywords = $location.search().keywords;
      }
      $location.search(search);
      return;
    };

    $scope.searchJobs = function () {
    	if ($scope.jobSearch.keywords.length > 0 || $scope.jobSearch.filter_by_fields || $scope.jobSearch.filter_by_locations) {
        $location.search({
          keywords: $scope.jobSearch.keywords,
          filter_by_fields: $scope.jobSearch.filter_by_fields,
          filter_by_locations: $scope.jobSearch.filter_by_locations
        });
      }
    }

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.jobSearch.keywords.length > 0) {
          $location.search({
            keywords: $scope.jobSearch.keywords,
            filter_by_fields: $scope.jobSearch.filter_by_fields,
            filter_by_locations: $scope.jobSearch.filter_by_locations
          });
        }
      }
    };
  }

  function JobDetailCtrl ($scope, $modal, Job) {
    $scope.job = Job.data;

    $scope.applyForJob = function (job) {
      var modalInstance = $modal.open ({
        templateUrl: '/job/_apply-job-popup.html',
        controller: 'ApplyJobModalCtrl',
        windowClass:'popup-job',
        backdrop: 'static',
        resolve: {
          id: function () {
            return job._id;
          },
          job: function () {
            return job;
          }
        }
      });

      modalInstance.result.then(function () {
        $scope.job.can_apply = false;
      });
    };
  }
  
  function ApplyJobModalCtrl ($scope, JobServices, id, job, $localStorage, $http, $modalInstance, $location) {
    var fd = new FormData();
    $scope.job = job;

    $scope.uploadCV = function(element) {
      fd.append("file", element.files[0]);
    };

    $scope.applyJob = function (candidate_data) {
      if (!candidate_data) {
        $scope.apply_error = true;
      } else {
        $scope.apply_error = false;
        $scope.upload_error = false;
        candidate_data.job_id = id;
        JobServices.applyJob(candidate_data).success(function () {
          $scope.upCV();
        }).error(function () {
          $scope.apply_fail = true;
        });
      };
    };

    $scope.upCV = function () {
      JobServices.uploadCV(fd).success(function () {
        $modalInstance.close(true);
      }).error(function () {
        $scope.upload_error = true;
        $scope.apply_fail = false;
      });
    };

    $scope.closePopup = function () {
      $modalInstance.dismiss();
    }
  }

  angular.module('job').controller('Tabs', function ($scope) {})
  angular.module('job.controllers', ['job.services'])
  .controller('ListJobCtrl', ['$scope', '$location', 'JobServices', 'JobsOfMemo', 'JobsForUser', 'allFilter', 'searchJobs', ListJobCtrl
  ])
  .controller('JobDetailCtrl', ['$scope', '$modal', 'Job', JobDetailCtrl
  ])
  .controller('ApplyJobModalCtrl', ['$scope', 'JobServices', 'id', 'job', '$localStorage', '$http', '$modalInstance', '$location', 
    ApplyJobModalCtrl
  ]);

}(window.angular));