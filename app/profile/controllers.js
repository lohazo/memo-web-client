(function (angular) {
    'use strict';
    function profileCtrl ($scope, ProfileServices, $modal, badgeServices, Profile) {
        badgeServices.getHighestOwnedBadges().success(function (data) {
            $scope.badges = data.badges;
        });
        $scope.profileDetail = Profile.detail;
        $scope.expChart = {
            labels: $scope.profileDetail.exp_chart.days,
            datasets: [{
                label: "",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#848484",
                pointColor: "#810c15",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: $scope.profileDetail.exp_chart.exp
            }]
        };

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

    function profileModalCtrl ($scope, badge) {
        $scope.badge = badge;
    }


    angular.module('profile.controllers', ['profile.services'])
        .controller('profileCtrl', ['$scope', 'ProfileServices', '$modal', 'badgeServices', 'Profile', profileCtrl])
        .controller('profileModalCtrl', ['$scope', 'badge', profileModalCtrl]);
}(window.angular));