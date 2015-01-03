'use strict';

// Bypass jslint
var angular = window.angular;

angular.module('app.directives', [])
  .directive('home', function() {
    return {
      restrict: 'EA',
      controller: 'HomeCtrl',
      templateUrl: 'home/_index.html'
    };
  })
  .directive('appHeader', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        shareType: '@',
        shareData: '@'
      },
      controller: 'HeaderCtrl',
      templateUrl: 'components/header/_header.html'
    };
  })
  .directive('facebookShareButton', function(AppSetting) {
    function displayFeedDialog(response) {
      FB.ui({
        method: 'feed',
        caption: response.data.caption,
        description: response.data.description,
        link: response.data.link
      }, function(response) {});
    }

    function displayDefaultFeedDialog() {
      FB.ui({
        method: 'share',
        href: 'http://memo.edu.vn'
      }, function(response) {});
    }

    return {
      restrict: 'EA',
      link: function($scope, $element, $attr) {
        $element.bind('click', function() {
          if ($scope.shareType === "level-up") {
            AppSetting.getLevelUpFacebookContent()
              .then(displayFeedDialog, displayDefaultFeedDialog);
          } else if ($scope.shareType === "finish-skill") {
            AppSetting.getFinishSkillFacebookContent($scope.shareData)
              .then(displayFeedDialog, displayDefaultFeedDialog);
          } else if ($scope.shareType === "referral-code") {
            AppSetting.getReferralShareFacebookContent($scope.shareData)
              .then(displayFeedDialog, displayDefaultFeedDialog);
          } else {
            displayDefaultFeedDialog();
          }
        })
      }
    };
  })
  .directive('facebookLoginButton', function() {
    return {
      strict: 'EA',
      link: function($scope, $element) {
        $element.bind('click', function() {
          $scope.FbLogin();
        });
      }
    };
  })
  .directive('landingpage', function() {
    return {
      restrict: 'EA',
      controller: 'LpCtrl',
      templateUrl: 'components/landingpage/_index.html'
    };
  });