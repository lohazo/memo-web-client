(function (angular) {
  'use strict';

  function AppCtrl($scope, $localStorage, $sessionStorage, $location, $window, $timeout, EcoTracker) {
    EcoTracker.init();
    if (!$localStorage.auth) {
      $localStorage.auth = {
        loggedIn: false,
        trial: false
      };
    }
    $scope.auth = $localStorage.auth;

    function loginConfirmed(e, data) {
      $scope.auth = {
        loggedIn: true,
        user: data.user
      };
      $localStorage.auth = $scope.auth;

      if (!$location.host().match(/(^memo.|.net.vn$|.local$)/g)) {
        $window.location = 'http://memo.edu.vn/authenticate?auth_token=' + $scope.auth.user.auth_token;
      }
    }

    function logoutConfirmed(e, data) {
      $localStorage.$reset();
      $sessionStorage.$reset();
      $scope.auth = {
        loggedIn: false,
        trial: false
      };
      $localStorage.auth = $scope.auth;
      $location.url('/');
    }

    $scope.$on('event:auth-loginConfirmed', loginConfirmed);
    $scope.$on('event:auth-logoutConfirmed', logoutConfirmed);
    $scope.$on('$routeChangeSuccess', function (e, next) {
      $scope.currentPath = $location.path();
    });

    $scope.chartOptions = {
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,

      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth: 1,

      //Boolean - Whether the line is curved between points
      bezierCurve: false,

      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot: true,

      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill: false,

      tooltipTemplate: "<%= value %>",

      tooltipFillColor: "#810C15",

      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };

    $scope.getNumber = function (num) {
      return new Array(num);
    };
  }

  angular.module('app.controllers', ['ngStorage'])
    .controller('AppCtrl', ['$scope', '$localStorage', '$sessionStorage', '$location', '$window',
      '$timeout', 'EcoTracking', AppCtrl
    ]);
}(window.angular));