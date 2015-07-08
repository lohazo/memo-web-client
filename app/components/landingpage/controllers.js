'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.controllers', [])
  .controller('LpCtrl', [
    '$scope',
    '$modal',
    function ($scope, $modal) {
      $scope.courseModal = function () {
        var modalInstance = $modal.open({
          template: '<div courses-modal></div>',
          controller: 'CourseModalInstanceCtrl',
          windowClass: 'course-modal'
        });
      };
    }
  ])
  .controller('CourseModalInstanceCtrl', [
    '$scope',
    function ($scope, $modalInstance) {

    }
  ])
  .controller('LpHeaderCtrl', [
    '$scope', '$routeParams',
    'MolServices', 'AuthService', '$element', '$modal',
    function ($scope, $routeParams, MolServices, AuthService, $element, $modal) {
      $scope.user = {};
      var data = $routeParams;
      data.preview = '1';
  // MolServices.saveC2(data);
      $scope.showLoginCTA = function () {
        return data.code_chanel && data.code_chanel === 'REF001'
      };

      $element.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          $scope.login();
        }
      });

      $scope.login = function () {
        var user = angular.fromJson(angular.toJson($scope.user));
        delete user.password;
        if (user.referral_code && user.referral_code !== "") {
          AuthService.checkCode({
              referral_code: user.referral_code
            })
            .then(function () {
              delete $scope.user.referral_code;
              AuthService.login($scope.user)
                .then(function () {
                  AuthService.submitReferralCode({
                    referral_code: user.referral_code
                  });
                });
            });
        } else {
          delete $scope.user.referral_code;
          AuthService.login($scope.user);
        }
      };

      $scope.FbLogin = function () {
        AuthService.FbLogin()
          .then(function (response) {
            AuthService.login(response)
          });
      };

      $scope.GLogin = function () {
        AuthService.GLogin();
      };

      $scope.openForgetPassword = function () {
        var modalInstance = $modal.open({
          template: '<div forget-modal></div>',
          controller: 'ForgetPasswordModalInstanceCtrl',
          windowClass: 'forget-modal'
        });

        modalInstance.result.then(function (msg) {
          if ($scope[msg] instanceof Function) $scope[msg]();
        });
      };
    }
  ])
  .controller('LpHeadCtrl', [
    '$scope', '$window',
    'Mixpanel', 'AuthService', '$route',
    function ($scope, $window, Mixpanel, AuthService, $route) {
      $scope.user = {};
      $scope.error = '';
      $scope.ref_code = $route.current.params.ref_code;

      if ($route.current.params.ref_code) {
        $scope.user.referral_code = $route.current.params.ref_code;
      };

      $scope.toAppStore = function () {
        $window.location.href =
          'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
      };

      $scope.toPlayStore = function () {
        $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
      };
      
      $scope.register = function () {
        AuthService.register($scope.user).then(closeModal, displayMessageOnFail);
      };

      $scope.FbLogin = function () {
        AuthService.FbLogin()
          .then(function (response) {
            response.referral_code = $route.current.params.ref_code;
            AuthService.login(response)
          });
      };

      $scope.GLogin = function () {
        var data = $route.current.params.ref_code;
        AuthService.GLogin(data);
      };

      function closeModal(data) {
      }

      function displayMessageOnFail(response) {
        if (response.data) {
          $scope.error = response.data.error || response.data.message;
        }
      }
    }
  ])
  .controller('LpInfoCtrl', ['$scope', '$window', 'Mixpanel', function ($scope, $window, Mixpanel) {
    $scope.toAppStore1 = function () {
      $window.location.href =
        'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
    };

    $scope.toPlayStore1 = function () {
      $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
    };

    $scope.toWPStore = function () {
      $window.location.href =
        'http://www.windowsphone.com/vi-vn/store/app/topica-memo-h%E1%BB%8Dc-ti%E1%BA%BFng-anh-mi%E1%BB%85n-ph%C3%AD/be98f876-f3e6-49a2-991d-78782129c557';
    };
  }])
  .controller('LpStatCtrl', [
    '$scope',
    function ($scope) {}
  ])
  .controller('LpCommentsCtrl', [
    '$scope',
    function ($scope) {
      $scope.comment = {
        user: 'Phương Nguyễn',
        content: 'Ứng dụng quá cool! Ngay cả bé nhà mình cũng thích chơi với kiến Memo :D'
      };
    }
  ])
  .controller('LpFooterCtrl', ['$scope', '$window', 'Mixpanel', function ($scope, $window, Mixpanel) {
    $scope.toAppStore2 = function () {
      $window.location.href =
        'https://itunes.apple.com/us/app/topica-memo-hoc-ngoai-ngu/id932238745?ls=1&mt=8';
    };
    $scope.toWP2 = function () {
      $window.location.href =
        'http://cleverstore.vn/ung-dung/topica-memo-hoc-ngoai-ngu-mien-phi-81580.html';
    };

    $scope.toPlayStore2 = function () {
      $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
    };
  }]);