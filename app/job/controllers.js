(function (angular) {
  'use strict';


  function ListJobCtrl ($scope, $location, JobServices, allJobs, hotJobs, allFilter, searchJobs) {
    $scope.max_page = 5;
    $scope.allJobs = allJobs.data;
    $scope.hotJobs = hotJobs.data;
    $scope.list_fields = allFilter.data.filter_by_fields;
    $scope.list_locations = allFilter.data.filter_by_locations;
    
    $scope.tabs = [{
      title: 'Tất cả',
      data: $scope.allJobs,
      active: true
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
      keywords: '',
      filter_by_field: '',
      filter_by_location: ''
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
    	if ($scope.jobSearch.keywords.length > 0 || $scope.jobSearch.filter_by_field || $scope.jobSearch.filter_by_location) {
        $location.search({
          keywords: $scope.jobSearch.keywords,
          filter_by_field: $scope.jobSearch.filter_by_field,
          filter_by_location: $scope.jobSearch.filter_by_location
        });
      }
    }

    $scope.search = function (e) {
      if (e.keyCode === 13) {
        if ($scope.jobSearch.keywords.length > 0) {
          $location.search({
            keywords: $scope.jobSearch.keywords,
            filter_by_field: $scope.jobSearch.filter_by_field,
            filter_by_location: $scope.jobSearch.filter_by_location
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
            return job._id;
          }
        }
      });
    };
  }
  
  function ApplyJobModalCtrl ($scope, JobServices, id, $localStorage, $http, $modalInstance, $location) {
    var fd = new FormData();

    $scope.uploadCV = function(element) {
      fd.append("file", element.files[0]);
    };

    $scope.applyJob = function (candidate_data) {
      if (!candidate_data) {
        alert("Vui lòng điền đầy đủ thông tin của bạn !!!")
      } else {
        candidate_data.job_id = id;
      };
      JobServices.applyJob(candidate_data).success(function () {
        $scope.upCV();
      }).error(function () {
        alert("Bạn nhập sai thông tin.Vui lòng nhập lại");
      });
    };

    $scope.upCV = function () {
      var auth_token = $localStorage.auth.user.auth_token;
      var uploadUrl = 'http://staging.memo.edu.vn/v2/api/jobs/upload_cv?auth_token=' + auth_token;

      $http.post(uploadUrl, fd, {
        withCredentials: false,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      }).success(function () {
        $scope.closePopup();
        alert("Bạn đã gửi hồ sơ thành công !!!");
        location.reload();
      }).error(function () {
        alert("Bạn chưa chọn file hoặc file không đúng định dạng");
      });
    };

    $scope.closePopup = function () {
      $modalInstance.close();
    }
  }

  angular.module('job').controller('Tabs', function ($scope) {})
  angular.module('job.controllers', ['job.services'])
  .controller('ListJobCtrl', ['$scope', '$location', 'JobServices', 'allJobs', 'hotJobs', 'allFilter', 'searchJobs', ListJobCtrl
  ])
  .controller('JobDetailCtrl', ['$scope', '$modal', 'Job', JobDetailCtrl
  ])
  .controller('ApplyJobModalCtrl', ['$scope', 'JobServices', 'id', '$localStorage', '$http', '$modalInstance', '$location', 
    ApplyJobModalCtrl
  ]);

}(window.angular));