(function (angular) {
  'use strict';

  function JobServices($http, $localStorage, API) {
  	var Services = {};

  	Services.getJobs = function (data) {
  		var endpoint = API + '/jobs?page=1';
      if (!data) {
        var data = {};
      }

  		endpoint += data.filter ? '&filter=' + data.filter : '';
  		endpoint += data.sort_by ? '&sort_by=' + data.sort_by : '';
  		endpoint += data.sort_type ? '&sort_type=' + data.sort_type : '';

  		return $http.get(endpoint);
  	};

    Services.getFilter = function () {
      var endpoint = API + '/jobs/all_filters';

      return $http.get(endpoint);
    }

  	Services.searchJobs = function (data) {
  		var endpoint = API + '/jobs/search?page=1';
      if (!data) {
        var data = {};
      }

      endpoint += data.filter_by_fields ? '&filter_by_field=' + data.filter_by_fields : '';
  		endpoint += data.filter_by_locations ? '&filter_by_location=' + data.filter_by_locations : '';
  		endpoint += data.sort_by ? '&sort_by=' + data.sort_by : '';
  		endpoint += data.sort_type ? '&sort_type=' + data.sort_type : '';
  		endpoint += data.keywords ? '&keywords=' + data.keywords : '';

  		return $http.get(endpoint);
  	}; 

  	Services.getJob = function (data) {
  		var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/jobs';

  		endpoint += data.slug ? '/' + data.slug : '';

      if (authToken.length > 0) {
        endpoint += data.slug ? '?auth_token=' + authToken : '';
      };

  		return $http.get(endpoint);
  	};

  	Services.applyJob = function (data) {
  		var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;

      return $http.post(API + '/jobs/apply', data);
  	};

  	Services.uploadCV = function (data) {
  		var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;

      return $http.post(API + '/jobs/upload_cv?auth_token=' + authToken,data,{
        withCredentials: false,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      });
  	}

    return Services;
  }

  angular.module('job.services', [])
    .factory('JobServices', ['$http', '$localStorage', 'API', JobServices]);
})(window.angular);