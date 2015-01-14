(function (angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, $rootScope, $location, Profile, TreeBuilder, AppSetting, Mixpanel,
    MemoTracker,
    Message) {
    function getProfile() {
      $scope.profile = Profile.user;
    }

    function buildTree() {
      TreeBuilder.getCheckpoints();
      TreeBuilder.getSkills();
      TreeBuilder.getTree();
      $scope.skillTree = TreeBuilder.build();

      $scope.iconSets = TreeBuilder.iconSets;
      MemoTracker.track('skills tree');
    }

    function getProfileDetail() {
      Profile.getProfileDetail()
        .then(function () {
          $scope.profileDetail = Profile.detail;
          $scope.expChart = {
            labels: $scope.profileDetail.exp_chart.days,
            datasets: [{
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "#848484",
              pointColor: "#810c15",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: $scope.profileDetail.exp_chart.exp
            }]
          };
          $rootScope.$broadcast('event-profileLoaded', Profile.detail);
        });
    }

    function takeATour() {
      if (AppSetting.shouldDisplayTour()) {
        $scope.displayTour = AppSetting.displayTour;
        $location.path('/welcome');
      }
    }

    // Chain calls
    AppSetting.getWords();
    Profile.getProfile()
      .then(getProfile)
      .then(AppSetting.get)
      .then(Message.list)
      .then(getProfileDetail)
      .then(AppSetting.getSharedSettings)
      .then(TreeBuilder.getIconSets)
      .then(buildTree)
      .then(takeATour);
  }

  function PlacementTestModalCtrl($scope, $modal, $rootScope) {

    $scope.profile = {};
    $scope.displayTour = false;
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'home/_placement-test-modal.html',
        controller: 'PlacementTestModalInstanceCtrl',
        windowClass: 'placement-test-modal',
        backdrop: 'static',
        resolve: {
          profile: function () {
            return $scope.profile;
          },
          displayTour: function () {
            return $scope.displayTour;
          }
        }
      });

      modalInstance.result.then(function (msg) {});

      $scope.$watch('displayTour', function () {
        if ($scope.displayTour) modalInstance.close();
      });
    };

    $scope.$watch('profile', function () {
      if ($scope.profile.is_beginner) {
        $scope.open();
      }
    });
  }

  function PlacementTestModalInstanceCtrl($scope, $modalInstance) {
    $scope.close = function () {
      $modalInstance.close();
    };
    $scope.$on('event:auth-logoutConfirmed', function () {
      $scope.close();
    })
  }

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', '$rootScope', '$location', 'Profile', 'TreeBuilder',
      'AppSetting',
      'Mixpanel', 'MemoTracking', 'Message', HomeMainCtrl
    ])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', '$rootScope',
      PlacementTestModalCtrl
    ])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance',
      PlacementTestModalInstanceCtrl
    ]);

}(window.angular));