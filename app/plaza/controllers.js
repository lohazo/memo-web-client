(function (angular) {
  'use strict';

  function PlazaCtrl($scope, $location, Plaza, Profile, $modal) {
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

    // show pop-up confirm when buy item
    $scope.confirm = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_confirm_pop-up.html',
        controller: 'ProgressQuizConfirmModalCtrl',
        windowClass: 'progress-quiz-confirm-modal',
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

    $scope.buyGuide = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'plaza/_buy-guide-popup.html',
        controller: 'BuyGuideModalCtrl',
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
        }).then(function () {
          if (item._id === 'progress_quiz') {
            $location.url('/progressquiz');
          }
        });
      }
      // alert("Bạn đã mua đồ thành công !!!")
    };
  }

  function ProgressQuizConfirmModalCtrl($scope, $modalInstance, id, Plaza) {
    $scope.confirm_before_buy_text = Plaza.data.items.filter(function (item) {
      return item._id === id;
    })[0].confirm_before_buy_text;

    $scope.close = function () {
      $modalInstance.dismiss();
    };

    $scope.buy = function () {
      $modalInstance.close("buy");
    };
  }

  function BuyGuideModalCtrl($scope, $sce, $modalInstance, id, Plaza) {
    $scope.item = Plaza.data.items.filter(function (item) {
      return item._id === id;
    })[0];

    $scope.trustedResource = $sce.trustAsResourceUrl($scope.item.buy_guide_url);
  }

  angular.module('plaza.controllers', [])
    .controller('PlazaCtrl', ['$scope', '$location', 'Plaza', 'Profile', '$modal', PlazaCtrl])
    .controller('ProgressQuizConfirmModalCtrl', ['$scope', '$modalInstance', 'id', 'Plaza',
      ProgressQuizConfirmModalCtrl
    ])
    .controller('BuyGuideModalCtrl', ['$scope', '$sce', '$modalInstance', 'id', 'Plaza',
      BuyGuideModalCtrl
    ]);
}(window.angular));