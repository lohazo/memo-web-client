(function (angular) {
    'use strict';
    function badgeCtrl ($scope, badgeServices) {
        badgeServices.getListBadge().success(function (data) {
            $scope.badges = data;
        })
    }
    angular.module('badge.controllers', ['badge.services'])
        .controller('badgeCtrl', ['$scope', 'badgeServices', badgeCtrl])
}(window.angular));