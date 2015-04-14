(function (angular) {
  'use strict';

  function AccountSetting($localStorage, Profile) {
    var User = {};
    User.setting = $localStorage.auth.accountSetting || {
      microEnabled: 1,
      speakerEnabled: 1,
      autoSoundEnabled: 1,
      soundEnabled: 1
    };

    $localStorage.auth.accountSetting = User.setting;

    User.saveChanges = function (data) {
      return Profile.update(data);
    };

    return User;
  }

  function AccountSettingCtrl($scope, $localStorage, AccountSetting, $upload, $http) {
    $scope.user = $localStorage.auth.user;
    $scope.setting = AccountSetting.setting;

    $scope.saveChanges = function () {
      var data = {};

      if ($scope.password && $scope.rePassword && $scope.password === $scope.rePassword) {
        // data = {};
        data.password = $scope.password;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.email && $scope.user.email.length > 0) {
        // data = {};
        data.email = $scope.user.email;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.username && $scope.user.username.length > 0) {
        // data = {};
        data.username = $scope.user.username;
        // AccountSetting.saveChanges(data);
      }

      if ($scope.user.mobile && $scope.user.mobile.length > 0) {
        // data = {};
        data.mobile = $scope.user.mobile;
        // AccountSetting.saveChanges(data);
      }

      AccountSetting.saveChanges(data);
    };

    // Change Avatar

    $scope.changeAvatar = function(element) { 
      var fd = new FormData();
      var auth_token = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;
      var uploadUrl = 'http://services.memo.edu.vn/v2/api/users/' + userId + '/avatar?auth_token=' + auth_token;
      fd.append("file", element.files[0]);
      
      $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      });

      var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function () {
            $scope.user.url_avatar = e.target.result;
          });
      }
      reader.readAsDataURL(element.files[0]);
    };
  }

  angular.module('settings.account', [])
    .controller('AccountSettingCtrl', ['$scope', '$localStorage', 'AccountSetting', '$upload', '$http',
      AccountSettingCtrl
    ])
    .factory('AccountSetting', ['$localStorage', 'Profile', AccountSetting]);

}(window.angular));