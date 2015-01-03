/**
 * Referral Controllers
 */

(function(angular) {
  'use strict';
  var PlayerView = function() {
    this.index = 0;
    // this.items = items;
  }

  var Singleton = (function() {
    var instance,
      view;

    function createInstance() {
      var object = new PlayerControl();
      return object;
    }

    function createView() {
      var view = new PlayerView();
      return view;
    }

    return {
      getInstance: function() {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      },
      getView: function() {
        if (!view) {
          view = createView();
        }
        return view;
      }
    };
  })();

  PlayerView.prototype = {
    first: function() {
      this.reset();
      // return this.current();
    },
    next: function() {
      this.index++;
    },
    hasNext: function() {
      return this.index < this.items.length;
    },
    hasPrev: function() {
      return this.index >= 0;
    },
    prev: function() {
      this.index--;
    },
    reset: function() {
      this.index = 0;
    },
    last: function() {
      this.index = this.items.length - 1;
      // return this.current();
    },
    current: function() {
      var cur = this.items[this.index];
      return cur;
    },
    each: function(callback) {
      for (var item = this.first(); this.hasNext(); this.next()) {
        callback(this.current());
      }
    },
    init: function(items) {
      this.items = items;
    }
  }

  Singleton.getView().init([
    'referral-body-one',
    'referral-body-two',
    'referral-body-three'
  ]);

  function ReferralCtrl($scope, service, profile) {
    //
  }

  function ReferralHeaderCtrl($scope, service) {}

  function ReferralBodyCtrl($scope, service) {
    $scope.$on('referral:body-next', function() {
      if (Singleton.getView().hasNext()) {
        Singleton.getView().next();
        $scope.directive = Singleton.getView().current();
      };
    });
    $scope.$on('referral:body-prev', function() {
      if (Singleton.getView().hasPrev()) {
        Singleton.getView().prev();
        $scope.directive = Singleton.getView().current();
      };
    });
    $scope.$on('referral:body-last', function() {
      Singleton.getView().last();
      $scope.directive = Singleton.getView().current();
    });
  }

  function ReferralFooterCtrl($scope, service, $location) {
    function next() {
      // PlayerControl.getInstance().next();
      $scope.$broadcast('referral:body-next');
    }

    function gotoLast() {
      // PlayerControl.getInstance().gotoLast();
      $scope.$broadcast('referral:body-last');
    }

    function gotoFirst() {
      // PlayerControl.getInstance().gotoFirst();
      $scope.$broadcast('referral:body-first');
    }

    function prev() {
      $scope.$broadcast('referral:body-prev');
    }

    function gotoProfile() {
      $location.path('/referral/profile');
    }

    $scope.control = {
      next: next,
      prev: prev,
      last: gotoLast,
      first: gotoFirst,
      gotoProfile: gotoProfile
    };
  }

  function ReferralEntercodeCtrl($scope, ReferralService, profile, $location, $modal) {
    if (!profile.user.auth_token) {
      $location.path('/');
    };

    $scope.shareType = 'referral-code';
    ReferralService.getStatus().then(function(res) {
      $scope.code = res.data.referral_code || 0;
      $scope.invite_count = res.data.record.invited_count || 0;
      $scope.shareData = $scope.code;
    });
    $scope.combo_days = profile.detail.combo_days;

    profile.getProfileDetail().then(function() {
      $scope.expChart = {
        labels: profile.detail.exp_chart.days,
        datasets: [{
          label: "",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "#848484",
          pointColor: "#810c15",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: profile.detail.exp_chart.exp
        }]
      };
    });

    $scope.submitCode = function() {
      var ref_code = $scope.refCode;

      ReferralService.submitCode(ref_code).then(function(res) {
        $scope.error = '';
        (function() {
          var modalInstance = $modal.open({
            template: '<div submitcode-modal></div>',
            windowClass: 'submitcode-modal'
          });

          modalInstance.result.then(function(msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      }, function(res) {
        $scope.error = res.data.message;
      });
    };
    $scope.verifyRewards = function() {
      ReferralService.verifyRewards().then(function(res){
        (function() {
          var modalInstance = $modal.open({
            // template: '<div verifyRewards-modal></div>',
            windowClass: 'verify-rewards-modal',
            templateUrl: 'components/referral/_verify_Rewards.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function() {
                return res.data.rewards_verification_code;
              }
            }
          });

          modalInstance.result.then(function(msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      });
    }
  }

  angular.module('referral.controllers', [])
    .controller('ReferralCtrl', ['$scope', 'ReferralService', 'Profile', ReferralCtrl])
    .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
    .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', ReferralBodyCtrl])
    .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', '$location', ReferralFooterCtrl])
    .controller('ReferralEntercodeCtrl', ['$scope', 'ReferralService', 'Profile', '$location', '$modal', ReferralEntercodeCtrl])
    .controller('ReferralRewardsCtrl', ['$scope', 'getRewardsCode', function($scope, code){
      $scope.reward_code = code;
    }])
})(window.angular);