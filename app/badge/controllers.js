(function (angular) {
    'use strict';
    function badgeCtrl ($scope, badgeServices, $modal) {
        badgeServices.getListBadge().success(function (data) {
            $scope.badges = data.badges;
        });

        $scope.test = function (item) {
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
    }


    angular.module('badge.controllers', ['badge.services'])
        .controller('badgeCtrl', ['$scope', 'badgeServices', '$modal', badgeCtrl])
        .controller('BadgeModalCtrl', ['$scope', 'badge', BadgeModalCtrl]);
}(window.angular));