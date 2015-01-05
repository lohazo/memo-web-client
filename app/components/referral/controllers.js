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
      return this.index;
    },
    next: function() {
      this.index = this.index + 1;
      return this.index;
    },
    hasNext: function() {
      return this.index < this.items.length - 1;
    },
    hasPrev: function() {
      return this.index > 0;
    },
    prev: function() {
      this.index = this.index - 1;
      return this.index;
    },
    reset: function() {
      this.index = 0;
      return this.index;
    },
    last: function() {
      this.index = this.items.length - 1;
      return this.index;
    },
    current: function() {
      return this.items[this.index];
    },
    each: function(callback) {
      for (var item = this.first(); this.hasNext(); this.next()) {
        callback(this.current());
      }
    },
    goTo: function(index) {
      this.index = index;
      return this.index;
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

  function ReferralCtrl($scope, service, $location) {
    Singleton.getView().reset();
    if (service.status == 1) {
      $location.path('/referral/profile');
    }
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

    $scope.view = {
      intro: true,
      price: false,
      payment: false
    };
    $scope.displayIntro = function() {
      $scope.view = {
        intro: true,
        price: false,
        payment: false
      };
    };
    $scope.displayPriceScholarship = function() {
      $scope.view = {
        intro: false,
        price: true,
        payment: false
      };
    };
    $scope.displayPaymentMethod = function() {
      $scope.view = {
        intro: false,
        price: false,
        payment: true
      };
    };
  }

  function ReferralFooterCtrl($scope, service, $location, Profile) {
    getAuthed();
    $scope.$on('event:auth-loginConfirmed', function() {
      getAuthed();
    });

    $scope.$on('event:auth-logoutConfirmed', function() {
      $scope.isAuthed = false;
    });

    function getAuthed() {
      Profile.getUser();
      $scope.isAuthed = Profile.user ? true : false;
    }

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
      service.joined();
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
    } else {
      profile.getProfileDetail().then(function() {
        $scope.isReferral = profile.detail.referral_user || '';
        $scope.userName = profile.detail.referral_user;
        $scope.user = profile.detail || {};
        $scope.combo_days = profile.detail.combo_days;
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
      }).then(function() {
        ReferralService.getStatus().then(function(res) {
          $scope.code = res.data.referral_code || 0;
          $scope.invite_count = res.data.record.invited_count || 0;
          $scope.FBShare.shareData = res.data.referral_code;
        });
      });
    }

    $scope.FBShare = {
      shareType: 'referral-code'
    };

    $scope.readme = function(data) {
      var modalInstance = $modal.open({
        windowClass: 'readme-modal',
        controller: 'ReferralReadmeCtrl',
        templateUrl: 'components/referral/_readme-' + data + '.html'
      });

      modalInstance.result.then(function(msg) {
        if ($scope[msg] instanceof Function) $scope[msg]();
      });
    };

    $scope.submitCode = function() {

      ReferralService.submitCode($scope.refCode).then(function(res) {
        $scope.error = '';
        $scope.isReferral = res.data.code || '';
        $scope.userName = res.data.referral_user || '';
      }, function(res) {
        $scope.error = res.data.message;
      });
    };
    $scope.verifyRewards = function() {
      ReferralService.verifyRewards().then(function(res) {
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
      }, function(res) {
        (function() {
          var modalInstance = $modal.open({
            template: '<article class="verify-reward-container"><div class="guide"><div class="sms-guide">{{reward_code}}</div></div></article>',
            windowClass: 'verify-rewards-modal',
            // templateUrl: 'components/referral/_verify_Rewards_Error.html',
            controller: 'ReferralRewardsCtrl',
            resolve: {
              getRewardsCode: function() {
                return res.data.message;
              }
            }
          });

          modalInstance.result.then(function(msg) {
            if ($scope[msg] instanceof Function) $scope[msg]();
          });
        })();
      });
    }

    var slide = new PlayerView();
    slide.init([
      'assets/img/referral/campaign_guide_1.png',
      'assets/img/referral/campaign_guide_2.png',
      'assets/img/referral/campaign_guide_3.png',
      'assets/img/referral/campaign_guide_4.png',
      'assets/img/referral/campaign_guide_5.png',
      'assets/img/referral/campaign_guide_6.png'
    ]);
    slide.reset();
    $scope.images = slide.items;
    $scope.image = slide.current();
    $scope.indexActive = 0;

    function next() {
      if (slide.hasNext()) {
        $scope.indexActive = slide.next();
      } else {
        $scope.indexActive = slide.reset();
      }
      $scope.image = slide.current();
    }

    function prev() {
      if (slide.hasPrev()) {
        $scope.indexActive = slide.prev();
      } else {
        $scope.indexActive = slide.last();
      }
      $scope.image = slide.current();
    }

    function goTo(index) {
      $scope.indexActive = slide.goTo(index);
      $scope.image = slide.current();
    }

    $scope.slide = {
      next: next,
      prev: prev,
      goTo: goTo
    }
  }

  function ReferralReadmeCtrl($scope, data) {}

  angular.module('referral.controllers', [])
    .controller('ReferralCtrl', ['$scope', 'ReferralService', '$location', ReferralCtrl])
    .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
    .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', ReferralBodyCtrl])
    .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', '$location', 'Profile', ReferralFooterCtrl])
    .controller('ReferralEntercodeCtrl', ['$scope', 'ReferralService', 'Profile', '$location', '$modal',
      ReferralEntercodeCtrl
    ])
    .controller('ReferralRewardsCtrl', ['$scope', 'getRewardsCode', function($scope, code) {
      $scope.reward_code = code;
    }])
    .controller('ReferralReadmeCtrl', ['$scope', ReferralReadmeCtrl]);
})(window.angular);