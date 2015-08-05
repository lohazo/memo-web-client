(function (angular) {
  'use strict';
  function badgeCtrl ($scope, badgeServices, $modal) {
    badgeServices.getListBadge().success(function (data) {
      $scope.badges = data.badges;
    });

    $scope.openBadgeModal = function (item) {
      var modalInstance = $modal.open({
        templateUrl: 'badge/_badge-modal.html',
        controller: 'BadgeModalCtrl',
        windowClass: 'badge-modal',
        resolve: {
          badge: function () {
              return item;
          }
        }
      });
    };
  }

  function BadgeModalCtrl ($scope, badge) {
      $scope.badge = badge;
      $scope.shareBadge = function () {
        // console.log($scope.badge)
        var data = {
          caption: badge.badge_category, //name
          description: badge._description,
          link: "http://memo.edu.vn",
          name: badge.name,
          picture: badge.unlock_image,
          method: 'feed'
        }
        FB.ui(data, function (response) {});
      }
  }

  angular.module('badge.controllers', ['badge.services'])
    .controller('badgeCtrl', ['$scope', 'badgeServices', '$modal', badgeCtrl])
    .controller('BadgeModalCtrl', ['$scope', 'badge', BadgeModalCtrl]);
}(window.angular));