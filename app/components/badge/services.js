(function (angular) {
    'use strict';
    function badgeServices ($http, $localStorage, API, $location) {
        var Services = {};
        var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

        Services.getListBadge = function () {
            var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
            var userId = $localStorage.auth.user._id;
            var endpoint = API + '/users/' + userId + '/badges?auth_token=' + authToken + '&platform=web&localize=' + localize;

            return $http.get(endpoint);
        };

        return Services;
    }

    angular.module('badge.services', [])
        .factory('badgeServices', ['$http', '$localStorage', 'API', '$location', badgeServices])
}(window.angular));