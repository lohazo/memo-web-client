(function (angular) {
  'use strict';

  function weakestWordConfig($routeProvider) {
  	$routeProvider.when('/weakestword', {
  		templateUrl: 'exam/weakestWord/_weakest-word.html',
  		controller: 'ListWeakestWordCtrl'
  	});
  	$routeProvider.when('/weakestword/:id', {
  		templateUrl: 'exam/weakestWord/_weakest-word-detail.html',
  		controller: 'WeakestWordDetailCtrl'
  	});
  }

  function ListWeakestWordCtrl($scope, WeakestWordServices) {
    $scope.max_size_page = 5;

    WeakestWordServices.listWeakestWord().success(function (data) {
      $scope.weakest_words = data;
      $scope.total_items = data.total_page * 10;
      $scope.currentPage = data.next_page - 1;
    });

    $scope.setPage = function (page) {
      $scope.data.page = page;
      WeakestWordServices.listWeakestWord($scope.data);
      return;
    };
  }

  function WeakestWordDetailCtrl($scope, WeakestWordServices) {
    WeakestWordServices.listWeakestWord().success(function (data) {
      $scope.weakest_words = data;
    });
  }

  function WeakestWordServices($http, $q, $localStorage, API)  {
    var Services = {};

    /*
     * data = {skill_id: , page: }
     */
    Services.listWeakestWord = function(data) {
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      var endpoint = API + '/users/' + userId + '/weakest_word' + '?platform=web&auth_token=' + authToken;

      // if (data.page) endpoint += '&page=' + data.page;
      // if (data.skill_id) endpoint += '&skill_id=' + data.skill_id;

      return $http.get(endpoint);
    };

    return Services;
  }

  angular.module('weakestWord', [])
    .config(['$routeProvider', weakestWordConfig])
    .controller('ListWeakestWordCtrl', ['$scope', 'WeakestWordServices', ListWeakestWordCtrl])
    .controller('WeakestWordDetailCtrl', ['$scope', 'WeakestWordServices', WeakestWordDetailCtrl])
    .factory('WeakestWordServices', ['$http', '$q', '$localStorage', 'API', WeakestWordServices]);
}(window.angular));