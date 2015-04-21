(function (angular) {
  'use strict';


  function ListJobCtrl ($scope, $location, JobServices, allJobs, newJobs, hotJobs, searchJobs) {
    $scope.max_page = 5;
    $scope.allJobs = allJobs.data;
    $scope.newJobs = newJobs.data;
    $scope.hotJobs = hotJobs.data;
    
    // console.log(searchJobs.data);
    
    $scope.tabs = [{
      title: 'Tất cả',
      data: $scope.allJobs,
      active: true
    },{
      title: 'Mới nhất',
      data: $scope.newJobs,
      active: false
    },{
      title: 'HOT',
      data: $scope.hotJobs,
      active: false
    }];

    if ($location.search().keywords) {
      $scope.searchJobs = searchJobs.data;
      $scope.tabs[0].active = false;
      $scope.tabs.push({
        title: 'Kết quả tìm kiếm',
        data: $scope.searchJobs,
        active: true
      });
    }

    $scope.jobSearch = {
      keywords: ''
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
    	if ($scope.jobSearch.keywords.length > 0) {
        $location.search({
          keywords: $scope.jobSearch.keywords
        });
      }
    }

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.jobSearch.keywords.length > 0) {
          $location.search({
            keywords: $scope.jobSearch.keywords
          });
        }
      }
    };
  }

  function JobDetailCtrl ($scope, $modal, Job) {
    $scope.job = Job.data;
    console.log(Job.data);

    $scope.applyForJob = function () {
      var modalInstance = $modal.open ({
        templateUrl: '/job/_apply-job-popup.html',
        controller: 'ApplyJobModalCtrl',
        // windowClass: ''
      })
    }
  }
  
  function ApplyJobModalCtrl ($scope, JobServices) {
    // $scope.applyJob = function (form_apply) {
    //   JobServices.applyJob(form_apply).success(function () {
    //     JobServices.uploadCV()
    //   });
    // };
  };

  angular.module('job').controller('Tabs', function ($scope) {})
  angular.module('job.controllers', ['job.services'])
  .controller('ListJobCtrl', ['$scope', '$location', 'JobServices', 'allJobs', 'newJobs', 'hotJobs', 'searchJobs', ListJobCtrl
  ])
  .controller('JobDetailCtrl', ['$scope', '$modal', 'Job', JobDetailCtrl
  ])
  .controller('ApplyJobModalCtrl', ['$scope', 'JobServices', 
    ApplyJobModalCtrl
  ]);

}(window.angular));