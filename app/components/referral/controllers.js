/**
 * Referral Controllers
 */

(function(angular) {
  'use strict';
  var PlayerView = function() {
    this.index = 0;
    // this.items = items;
  }
 
  PlayerView.prototype = {
    first: function() {
      this.reset();
      return this.current();
    },
    next: function() {
      return this.items[this.index++];
    },
    hasNext: function() {
      return this.index <= this.items.length;
    },
    reset: function() {
      this.index = 0;
    },
    last: function() {
      this.index = this.items.length;
      return this.current();
    },
    current: function() {
      return this.items[this.index];
    },
    each: function(callback) {
      for (var item = this.first(); this.hasNext(); item = this.next()) {
        callback(item);
      }
    },
    init: function(items) {
      this.items = items;
    }
  }

  var PlayerControl = (function () {
    var instance,
        view;
 
    function createInstance() {
      var object = new Object();
      return object;
    }

    function createView() {
      var view = new PlayerView();
      return view;
    }

    function next() {}

    function goto(index) {
      //
    }

    function gotoFirst() {
      //
    }

    function gotoLast() {
      //
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

  PlayerControl.getView().init([
    'components/referral/_step_one.html',
    'components/referral/_step_two.html',
    'components/referral/_step_three.html'
  ]);

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

  function ReferralBodyCtrl($scope, service) {}

  function ReferralFooterCtrl($scope, service) {
    function next() {
      PlayerControl.getInstance().next();
      $scope.$broadcast('referral:body-next');
    }

    function gotoLast() {
      PlayerControl.getInstance().gotoLast();
      $scope.$broadcast('referral:body-last');
    }

    function gotoFirst() {
      PlayerControl.getInstance().gotoFirst();
      $scope.$broadcast('referral:body-first');
    }
  }

  angular.module('referral.controllers', [])
        .controller('ReferralCtrl', ['$scope', 'ReferralService', ReferralCtrl])
        .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
        .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', ReferralBodyCtrl])
        .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', ReferralFooterCtrl])
        .controller('ReferralEntercodeCtrl', ['$scope', 'ReferralService', ReferralEntercodeCtrl])
})(window.angular);