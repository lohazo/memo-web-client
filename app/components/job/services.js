(function (angular) {
  'use strict';

  function JobServices($http, $localStorage, API) {
  	var Services = {};

  	Services.getJobs = function (data) {
  		var endpoint = API + '/jobs';
      if (!data) {
        var data = {};
      }
  		endpoint += data.page ? '?page=' + data.page : '';
  		endpoint += data.filter ? '?filter=' + data.filter : '';
  		endpoint += data.sort_by ? '?sort_by=' + data.sort_by : '';
  		endpoint += data.sort_type ? '?sort_type=' + data.sort_type : '';

  		return $http.get(endpoint);
  	};

  	Services.searchJobs = function (data) {
  		var endpoint = API + '/jobs/search';
      if (!data) {
        var data = {};
      }

  		endpoint += data.page ? '?page=' + data.page : '';
  		endpoint += data.filter ? '?filter=' + data.filter : '';
  		endpoint += data.sort_by ? '?sort_by=' + data.sort_by : '';
  		endpoint += data.sort_type ? '?sort_type=' + data.sort_type : '';
  		endpoint += data.keywords ? '?keyword=' + data.keywords : '';

  		return $http.get(endpoint);
  	};

  	Services.getJob = function (data) {
  		var endpoint = API + '/jobs';
      if (!data) {
        var data = {};
      }

  		endpoint += data.slug ? '/?slug=' + data.slug : '';

  		return $http.get(endpoint);
  	};

  	Services.applyJob = function (data) {
  		var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.job_id = '';
      data.fullname = '';
      data.email = '';
      data.mobile = '';
      data.content = '';

      return $http.post(API + '/jobs/apply', data);
  	};

  	Services.uploadCV = function (data) {
  		var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.candidate_id = '';

      return $http.post(API + '/jobs/upload_cv', data);
  	}

    return Services;
  }

  angular.module('job.services', [])
    .factory('JobServices', ['$http', '$localStorage', 'API', JobServices]);
})(window.angular);