(function (angular) {
  'use strict';


  function ListJobCtrl ($scope, JobServices, allJobs, newJobs, hotJobs, searchJobs) {
    $scope.max_page = 5;

    // $scope.allJobs = allJobs.data;
    // $scope.newJobs = newJobs.data;
    // $scope.hotJobs = hotJobs.data;
    // $scope.searchJobs = searchJobs.data;
    $scope.allJobs = {
      jobs: [{
        title: 'Automation Engineer',
        slug: '',
        description: 'An engineer excited to help TOPCIA Memo develop faster while delivering high quality products.',
        content: ["Thưởng định kì","Chửi sếp thoải mái"],
        location: 'Hà nội',
        field: 'IT',
        type: 'Full-time',
        is_hot: false,
        created_at: '',
      },
      {
        title: 'Brand Designer',
        slug: '',
        description: 'A visionary designer to join TOPICA Memo’s marketing team.',
        content: ["Môi trường làm việc thoải mái","Nhiều cơ chế đãi ngộ"],
        location: 'Hà nội',
        field: 'Marketing',
        type: 'Part-time',
        is_hot: true,
        created_at: '',
      },
      {
        title: 'Java Developer ($800-$1.400)',
        slug: '',
        description: 'Create technical designs for new integrations into 3rd party products',
        content: ["Công việc nhẹ nhàng","Lương cao"],
        location: 'TP.Hồ Chí Minh',
        field: 'IT',
        type: 'Full-time',
        is_hot: true,
        created_at: '',
      },
      {
        title: 'Sale Executive-logistics/forwarding',
        slug: '',
        description: 'Conduct sales planning and follow up in line with company sales targets, objectives and strategies',
        content: ["Thưởng định kì","Chửi sếp thoải mái"],
        location: 'Vũng Tàu',
        field: 'Sale',
        type: 'Part-time',
        is_hot: false,
        created_at: '',
      }], 
      next_page: 1, 
      total_pages: 10
    }

    $scope.hotJobs = {
    	jobs: [{
        title: 'Brand Designer',
        slug: '',
        description: 'A visionary designer to join TOPICA Memo’s marketing team.',
        content: ["Môi trường làm việc thoải mái","Nhiều cơ chế đãi ngộ"],
        location: 'Hà nội',
        field: 'Marketing',
        type: 'Part-time',
        is_hot: true,
        created_at: '',
      },
      {
        title: 'Java Developer ($800-$1.400)',
        slug: '',
        description: 'Create technical designs for new integrations into 3rd party products',
        content: ["Công việc nhẹ nhàng","Lương cao"],
        location: 'TP.Hồ Chí Minh',
        field: 'IT',
        type: 'Full-time',
        is_hot: true,
        created_at: '',
      }], 
      next_page: 1, 
      total_pages: 10
    }

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

    // if ($location.search().keywords) {
    //   $scope.tabs.push({
    //     title: 'Kết quả tìm kiếm',
    //     data: $scope.searchJobs,
    //     active: true
    //   });
    // }

    $scope.jobSearch = {
      keywords: ''
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

  function JobDetailCtrl ($scope) {

  }
  angular.module('job').controller('Tabs', function ($scope) {})
  angular.module('job.controllers', ['job.services'])
  .controller('ListJobCtrl', ['$scope', ListJobCtrl
    ])
  .controller('JobDetailCtrl', ['$scope',
    JobDetailCtrl
    ]);

}(window.angular));