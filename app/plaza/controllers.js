(function (angular) {
  'use strict';

  function PlazaCtrl($scope, $sce, $location, Plaza, Profile, ReferralService, $modal, res1, res2, res3, AppSetting, $rootScope, $translate, $localStorage) {
    AppSetting.getSharedSettings().then(function () {
      $scope.sharedSettings = AppSetting.shared_settings;
      $rootScope.$broadcast('event-sharedSettingsLoaded');
    })

    $translate.use($localStorage.auth.user.display_lang);
    
    $scope.profile = Profile.user;
    $scope.profileDetail = Profile.detail;
    $scope.plaza = Plaza.data;
    $scope.leaderboardData = [res1.data.leaderboard_by_week, res2.data.leaderboard_by_month,
      res3.data.leaderboard_all_time
    ];

    $scope.FBShare = {
      shareType: 'referral-code'
    };

    ReferralService.getStatus().then(function (res) {
      $scope.referral = res.data;
      $scope.referral.record.code = res.data.record.code || 0;
      $scope.referral.record.invited_count = res.data.record.invited_count || 0;
      $scope.FBShare.shareData = res.data.referral_code;
    });

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
        windowClass: 'buy-guide-popup-modal',
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

    $scope.powerUpSectionFilter = function (item) {
      return (["power-ups", "practice"].indexOf(item.section) >= 0);
    };

    $scope.specialSectionFilter = function (item) {
      return (["special"].indexOf(item.section) >= 0);
    };

    $scope.reload = function () {
      Plaza.get().then(function (response) {
        $scope.plaza = Plaza.data;
      });
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
          } else if ($scope.plaza.claim_guide_url) {
            var modalInstance = $modal.open({
              templateUrl: 'plaza/_claim_guide.html',
              controller: 'ClaimGuideModalCtrl',
              windowClass: 'buy-guide-popup-modal',
              backdrop: 'static',
              resolve: {
                id: function () {
                  return id;
                },
              }
            });

            modalInstance.result.then(function (msg) {
              if ($scope[msg] && $scope[msg] instanceof Function) $scope[msg](id);
            });
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

  function ClaimGuideModalCtrl($scope, $sce, $modalInstance, id, Plaza) {
    $scope.buy = function (data) {
      $modalInstance.close("buy");
    };

    $scope.dismissReport = function () {
      $modalInstance.close("reload");
    };
    $scope.trustedResource = $sce.trustAsResourceUrl(Plaza.data.claim_guide_url);
  }

  function BuyGuideModalCtrl($scope, $sce, $modalInstance, id, Plaza) {
    $scope.item = Plaza.data.items.filter(function (item) {
      return item._id === id;
    })[0];

    $scope.trustedResource = $sce.trustAsResourceUrl($scope.item.buy_guide_url);
  }

  angular.module('plaza.controllers', [])
    .controller('PlazaCtrl', ['$scope', '$sce', '$location', 'Plaza', 'Profile', 'ReferralService', '$modal', 'res1',
      'res2', 'res3', 'AppSetting', '$rootScope', '$translate', '$localStorage', PlazaCtrl
    ])
    .controller('ProgressQuizConfirmModalCtrl', ['$scope', '$modalInstance', 'id', 'Plaza',
      ProgressQuizConfirmModalCtrl
    ])
    .controller('ClaimGuideModalCtrl', ['$scope', '$sce', '$modalInstance', 'id', 'Plaza',
      ClaimGuideModalCtrl
    ])
    .controller('BuyGuideModalCtrl', ['$scope', '$sce', '$modalInstance', 'id', 'Plaza',
      BuyGuideModalCtrl
    ]);
}(window.angular));