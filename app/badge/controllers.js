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

  function BadgeModalCtrl ($scope, badge, $localStorage) {
      $scope.badge = badge;
      $scope.shareBadge = function () {
        // console.log($scope.badge)
        var data = {
          caption: 'http://memo.edu.vn', //name
          description: 'TOPICA Memo là ứng dụng học tiếng Anh hoàn toàn MIỄN PHÍ. Các bài học được thiết kế dưới dạng trò chơi khiến cho việc học tiếng Anh chưa bao giờ DỄ DÀNG và THÚ VỊ đến thế. Tham gia học với kiến '+ $localStorage.auth.user.username +' ngay để tiến bộ từng ngày!',
          link: "http://memo.edu.vn/?code_chanel=ShareFB&id_landingpage=2&id_campaign=1&id=199",
          name: 'Chúc mừng '+ $localStorage.auth.user.username +' đã dành được huy hiệu ' + badge.name,
          picture: badge.share_image,
          method: 'feed'
        };
        FB.ui(data, function (response) {});
      }
  }

  angular.module('badge.controllers', ['badge.services'])
    .controller('badgeCtrl', ['$scope', 'badgeServices', '$modal', badgeCtrl])
    .controller('BadgeModalCtrl', ['$scope', 'badge', '$localStorage', BadgeModalCtrl]);
}(window.angular));