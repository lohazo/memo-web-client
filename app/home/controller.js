(function(angular) {
  'use strict';

  function HomeCtrl($scope) {}

  function HomeMainCtrl($scope, Profile, TreeBuilder, AppSetting, Mixpanel, MemoTracker, Message) {
    function getProfile() {
      $scope.profile = Profile.data.user_info;
    }

    function buildTree() {
      TreeBuilder.getCheckpoints();
      TreeBuilder.getSkills();
      TreeBuilder.getTree();
      $scope.skillTree = TreeBuilder.build();

      MemoTracker.track('skills tree');
    }

    function getProfileDetail() {
      Profile.getProfileDetail($scope.auth.user)
        .then(function() {
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
        });
    }

    // Chain calls
    Profile.getProfile($scope.auth.user)
      .then(getProfile)
      .then(AppSetting.get)
      .then(buildTree)
      .then(getProfileDetail);
  }

  function PlacementTestModalCtrl($scope, $modal, $rootScope) {

    $scope.profile = {};
    $scope.open = function() {
      var modalInstance = $modal.open({
        templateUrl: 'home/_placement-test-modal.html',
        controller: 'PlacementTestModalInstanceCtrl',
        windowClass: 'placement-test-modal',
        backdrop: 'static',
        resolve: {
          profile: function() {
            return $scope.profile;
          }
        }
      });

      modalInstance.result.then(function(msg) {});
    };

    $scope.$watch('profile', function() {
      if ($scope.profile.is_beginner) {
        $scope.open();
      }
    });
  }

  function PlacementTestModalInstanceCtrl($scope, $modalInstance) {
    $scope.close = function() {
      $modalInstance.close();
    };
  }

  angular.module('home.controller', ['app.services', 'message.directives'])
    .controller('HomeCtrl', ['$scope', HomeCtrl])
    .controller('HomeMainCtrl', ['$scope', 'Profile', 'TreeBuilder', 'AppSetting', 'Mixpanel', 'MemoTracking', 'Message', HomeMainCtrl])
    .controller('PlacementTestModalCtrl', ['$scope', '$modal', '$rootScope', PlacementTestModalCtrl])
    .controller('PlacementTestModalInstanceCtrl', ['$scope', '$modalInstance', PlacementTestModalInstanceCtrl]);

}(window.angular));