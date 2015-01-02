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
      return this.next();
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
    'components/landingpage/_step_one.html',
    'components/landingpage/_step_two.html',
    'components/landingpage/_step_three.html'
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

  function ReferralHeaderCtrl() {}

  function ReferralBodyCtrl() {}

  function ReferralFooterCtrl() {
    $scope.
  }

  angular.module('referral.controllers', [])
        .controller('ReferralCtrl', ['$scope', 'ReferralService', ReferralCtrl])
        .controller('ReferralHeaderCtrl', ['$scope', 'ReferralService', ReferralHeaderCtrl])
        .controller('ReferralBodyCtrl', ['$scope', 'ReferralService', ReferralBodyCtrl])
        .controller('ReferralFooterCtrl', ['$scope', 'ReferralService', ReferralFooterCtrl])
})(window.angular);