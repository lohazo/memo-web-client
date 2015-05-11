(function (angular) {
  'use strict';

  function weakestWordConfig($routeProvider) {
  	$routeProvider.when('/weakestword', {
  		templateUrl: 'weakestWord/_weakest-word.html',
  		controller: 'ListWeakestWordCtrl'
  	});
  }

  function ListWeakestWordCtrl($scope, $location, ngAudio, WeakestWordServices) {
    $scope.max_page = 5;

    function convertTime(data) {
      var time = angular.copy(data);
      time.weakest_words = time.weakest_words.map(function (word) {
        word.time_ago = Math.round((new Date('' + word.pre_exercise)).getTime() / 1000);
        return word;
      })
      return time;
    }

    WeakestWordServices.listWeakestWord().success(function (data) {
      $scope.weakest_word = convertTime(data);
      $scope.total_items = data.total_page * 10;
      $scope.currentPage = data.next_page - 1;
    });

    $scope.setPage = function (page) {
      if (!$scope.sorted_by_desc || !$scope.sorted) {
        $scope.weakest_word.page = page;
        $scope.weakest_word.sort_by = $scope.save_sort_by;
        $scope.weakest_word.sort_type = $scope.save_sort_type;
        WeakestWordServices.listWeakestWord($scope.weakest_word).success(function (data) {
         $scope.weakest_word = convertTime(data);
        });
        $scope.sorted_by_desc = true;
      } else if ($scope.sorted_by_desc) {
        $scope.weakest_word.page = page;
        $scope.weakest_word.sort_by = $scope.save_sort_by;
        $scope.weakest_word.sort_type = $scope.save_sort_type;
        WeakestWordServices.listWeakestWord($scope.weakest_word).success(function (data) {
         $scope.weakest_word = convertTime(data);
        });
        $scope.sorted_by_desc = false;
      };
      
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
    
    $scope.sortWeakestWord = function (sort_by) {
      $scope.save_sort_by = sort_by;
      if (!$scope.sorted_by_desc || !$scope.sorted) {
        $scope.save_sort_type = 'desc';
        WeakestWordServices.listWeakestWord({
          sort_by: sort_by,
          sort_type: 'desc'
        }).success(function (data) {
           $scope.weakest_word = convertTime(data);
        });
        $scope.sorted_by_desc = true;
      } else if ($scope.sorted_by_desc) {
        $scope.save_sort_type = 'asc';
        WeakestWordServices.listWeakestWord({
          sort_by: sort_by,
          sort_type: 'asc'
        }).success(function (data) {
          $scope.weakest_word = convertTime(data);
        });
        $scope.sorted_by_desc = false;
      };
      $scope.sorted = true;
    }
  }

  function WeakestWordServices($http, $q, $localStorage, API)  {
    var Services = {};

    /*
     * data = {skill_id: , page: , sort_by: , sort_type:}
     */
    Services.listWeakestWord = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      var endpoint = API + '/users/' + userId + '/weakest_word' + '?platform=web&auth_token=' + authToken;

      if (data) endpoint += '&page=' + data.page;
      // if (data.skill_id) endpoint += '&skill_id=' + data.skill_id;
      if (data) endpoint += '&sort_by=' + data.sort_by;
      if (data) endpoint += '&sort_type=' + data.sort_type;

      return $http.get(endpoint);
    };

    return Services;
  }

  angular.module('weakestWord', [])
    .config(['$routeProvider', weakestWordConfig])
    .controller('ListWeakestWordCtrl', ['$scope', '$location', 'ngAudio', 'WeakestWordServices', ListWeakestWordCtrl])
    .factory('WeakestWordServices', ['$http', '$q', '$localStorage', 'API', WeakestWordServices]);
}(window.angular));