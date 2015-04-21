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

    $scope.applyForJob = function (job) {
      var modalInstance = $modal.open ({
        templateUrl: '/job/_apply-job-popup.html',
        controller: 'ApplyJobModalCtrl',
        // windowClass: ''
        resolve: {
          id: function () {
            return job.slug
          }
        }
      })
    }
  }
  
  function ApplyJobModalCtrl ($scope, JobServices, id, $localStorage, $http) {
    $scope.uploadCV = function(element) { 
      var fd = new FormData();
      var auth_token = $localStorage.auth.user.auth_token;
      var uploadUrl = 'http://staging.memo.edu.vn/v2/api/jobs/upload_cv?auth_token=' + auth_token;
      fd.append("file", element.files[0]);
      
      $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      });
    };
    $scope.applyJob = function (form_apply) {
      form_apply.job_id = id;
      JobServices.applyJob(form_apply).success(function () {
      });
    };
  };

  angular.module('job').controller('Tabs', function ($scope) {})
  angular.module('job.controllers', ['job.services'])
  .controller('ListJobCtrl', ['$scope', '$location', 'JobServices', 'allJobs', 'newJobs', 'hotJobs', 'searchJobs', ListJobCtrl
  ])
  .controller('JobDetailCtrl', ['$scope', '$modal', 'Job', JobDetailCtrl
  ])
  .controller('ApplyJobModalCtrl', ['$scope', 'JobServices', 'id', '$localStorage', '$http', 
    ApplyJobModalCtrl
  ]);

}(window.angular));