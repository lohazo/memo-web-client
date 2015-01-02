/**
 * Referral Controllers
 */

(function(angular) {
  'use strict';
  var PlayerView = function() {
    this.index = 0;
    // this.items = items;
  }

    var Singleton = (function () {
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
      return this.items[this.index++];
    },
    hasNext: function() {
      return this.index < this.items.length;
    },
    reset: function() {
      this.index = 0;
    },
    last: function() {
      this.index = this.items.length;
      return this.current();
    },
    current: function() {
      var cur = this.items[this.index];
      this.index++;
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
    // 'referral-body-one',
    'referral-body-two',
    'referral-body-three'
  ]);

  var PlayerControl = function() {}

  PlayerControl.prototype = {
    next: function() {
      // var cur = Singleton.getView().current();
      return Singleton.getView().current();
      // return cur;
    },

    hasNext: function() {
      return Singleton.getView().hasNext();
    },

    goto: function(index) {
      //
    },

    gotoFirst: function() {
      //
    },

    gotoLast: function() {
      //
    }
  }

  function ReferralCtrl($scope, service) {
    $scope.submitCode = function(){
      var ref_code = $scope.ref_code;

      service.verifyRewards(ref_code).then(function(res){
        console.log(res.data);
      }, function(res){
        $scope.error = res.data.message;
        console.log(res.data.message);
      });
    };
  }

  function ReferralHeaderCtrl($scope, service) {}

  function ReferralBodyCtrl($scope, service) {
    $scope.$on('referral:body-next', function(){
      if (Singleton.getInstance().hasNext()) {
        var direc = Singleton.getInstance().next();
        console.log(direc);
        $scope.directive = direc;
      };
    })
  }

  function ReferralFooterCtrl($scope, service) {
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

    $scope.control = {
      next: next,
      last: gotoLast,
      first: gotoFirst,
    };
  }

  angular.module('referral.controllers', [])
        .controller('ReferralCtrl', ['$scope', 'ReferralService', ReferralCtrl])
        .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
        .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', ReferralBodyCtrl])
        .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', ReferralFooterCtrl])
        .controller('ReferralEntercodeCtrl', ['$scope', 'ReferralService', ReferralEntercodeCtrl])
})(window.angular);