(function (angular) {
  'use strict';

  function JobServices($http, $localStorage, API) {
  	
  }

  angular.module('job.services', [])
    .factory('JobServices', ['$http', '$localStorage', 'API', JobServices]);
})(window.angular);