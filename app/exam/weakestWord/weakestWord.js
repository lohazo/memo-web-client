(function (angular) {
  'use strict';

  function weakestWordConfig($routeProvider) {
  	$routeProvider.when('/weakestword', {
  		templateUrl: 'exam/weakestWord/_weakest-word.html',
  		controller: 'ListWeakestWordCtrl'
  	});
  }

  function ListWeakestWordCtrl($scope, $location, ngAudio, WeakestWordServices) {
    $scope.max_page = 5;

    WeakestWordServices.listWeakestWord().success(function (data) {
      $scope.weakest_word = data;
      $scope.total_items = data.total_page * 10;
      $scope.currentPage = data.next_page - 1;
    });

    $scope.setPage = function (page) {
      $scope.weakest_word.page = page;
      WeakestWordServices.listWeakestWord($scope.weakest_word).success(function (data) {
        $scope.weakest_word = data;
      });
    };

    $scope.getWordDetail = function (word) {
      $scope.word_detail = word;
      $scope.getDetail = true;
      var normalFile = ngAudio.load($scope.word_detail.sound);
      $scope.speaker = {
        play: function() {
          normalFile.play();
        }
      };
    };

    $scope.backListWeakestWord = function () {
      $scope.getDetail = false;
    }
  }

  function WeakestWordServices($http, $q, $localStorage, API)  {
    var Services = {};

    /*
     * data = {skill_id: , page: , soft_by:}
     */
    Services.listWeakestWord = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      var endpoint = API + '/users/' + userId + '/weakest_word' + '?platform=web&auth_token=' + authToken;

      if (data) endpoint += '&page=' + data.page;
      // if (data.skill_id) endpoint += '&skill_id=' + data.skill_id;

      return $http.get(endpoint);
    };

    return Services;
  }

  angular.module('weakestWord', [])
    .config(['$routeProvider', weakestWordConfig])
    .controller('ListWeakestWordCtrl', ['$scope', '$location', 'ngAudio', 'WeakestWordServices', ListWeakestWordCtrl])
    .factory('WeakestWordServices', ['$http', '$q', '$localStorage', 'API', WeakestWordServices]);
}(window.angular));