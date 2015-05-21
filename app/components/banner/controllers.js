(function (angular) {

  'use strict';

  function BannerCtrl ($scope, ProfileServices, Profile) {
    $scope.birthday = {
      day: '',
      month: '',
      year: ''
    };

    $scope.birth_day = Profile.user.birth_day;
    console.log($scope.birth_day);

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

      // convert birthday to time stamp
      var newDate = $scope.birthday.day + "/" + $scope.birthday.month + "/" + $scope.birthday.year;
      var birthday = new Date(newDate).getTime();

      ProfileServices.updateBirthday({birth_day: birthday}).success(function () {
        $scope.profileDetail.virtual_money += 5;
      });
    };
  }

  angular.module('banner.controller', [])
    .controller('BannerCtrl', ['$scope', 'ProfileServices', 'Profile', 
      BannerCtrl
    ]);

}(window.angular));