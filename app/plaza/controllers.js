(function (angular) {
  'use strict';

  function PlazaCtrl($scope, Plaza, Profile, $modal) {
    $scope.profile = Profile.user;
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

    // $rootScope.$broadcast('event-profileLoaded', Profile.detail);

    // show pop-up confirm when buy item
    $scope.confirm = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_confirm_pop-up.html',
        controller: 'ProgressQuizConfirmModalCtrl',
        windowClass: 'placement-test-modal',
        resolve: {
          id: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function (msg) {
        if ($scope[msg] && $scope[msg] instanceof Function) $scope[msg](id);
      });
    }

    $scope.plaza = Plaza.data;

    $scope.powerUpSectionFilter = function (item) {
      return (["power-ups", "practice"].indexOf(item.section) >= 0);
    };

    $scope.specialSectionFilter = function (item) {
      return (["special"].indexOf(item.section) >= 0);
    };

    Plaza.get().then(function (response) {
      $scope.plaza = Plaza.data;
    });

    $scope.buy = function (id) {
      var data = {};
      var item = $scope.plaza.items.filter(function (item) {
        return item._id === id;
      })[0];

      if (item) {
        data.base_item_id = id;
        data.quantity = 1;
        Plaza.buy(data).then(function () {
          $scope.plaza = Plaza.data;
        });
      }
    };
  }

  function ProgressQuizConfirmModalCtrl($scope, $modalInstance, id) {
    $scope.close = function () {
      $modalInstance.dismiss();
    };

    $scope.buy = function () {
      $modalInstance.close("buy");
    };
  }

  angular.module('plaza.controllers', [])
    .controller('PlazaCtrl', ['$scope', 'Plaza', 'Profile', '$modal', PlazaCtrl])
    .controller('ProgressQuizConfirmModalCtrl', ['$scope', '$modalInstance', 'id',
      ProgressQuizConfirmModalCtrl
    ])

}(window.angular));