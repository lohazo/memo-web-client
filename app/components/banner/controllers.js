(function (angular) {

  'use strict';

  function BannerServices ($http, $localStorage, API, $location) {
    var Services = {};

    Services.getBanner = function () {
      var authToken = $localStorage.auth.user.auth_token;
      var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

      var endpoint = API + '/banner/?platform=web&localize=' + localize + '&auth_token=' + authToken ;

      return $http.get(endpoint);
    };

    return Services;
  }

  function BannerCtrl ($scope, ProfileServices, Profile) {
    $scope.birthday = {
      day: '',
      month: '',
      year: ''
    };

    $scope.birth_day = Profile.user.birth_day;

    $scope.updateBirthday = function () {
      if ($scope.birthday.day.length <= 0) {
        alert("Bạn chưa chọn ngày sinh");
        return;
      }

      if ($scope.birthday.month.length <= 0) {
        alert("Bạn chưa chọn tháng");
        return;
      }

      if ($scope.birthday.year.length <= 0) {
        alert("Bạn chưa chọn năm sinh");
        return;
      }

      // convert birthday data to time stamp
      var newDate = $scope.birthday.day + "/" + $scope.birthday.month + "/" + $scope.birthday.year;
      var birthday = new Date(newDate).getTime();

      ProfileServices.updateBirthday({birth_day: newDate}).success(function () {
        $scope.profileDetail.total_exp += 50;
        $scope.profile.birth_day = true;
      });
    };
  }

  angular.module('banner.controller', [])
    .factory('BannerServices', ['$http', '$localStorage', 'API', '$location', BannerServices])
    .controller('BannerCtrl', ['$scope', 'ProfileServices', 'Profile', 
      BannerCtrl
    ]);

}(window.angular));