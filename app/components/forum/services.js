(function (angular){
	'use strict';

	function ForumServices($http, $q, $localStorage, API) {
		var Services = {};

    /*
     * data = {title: , content: , base_course_id: , [questtion_log_id: ]}
     */
		Services.createPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
  	
      return $http.post(API + '/posts', data);
    };


    Services.getListSubscription = function () {
      var authToken = $localStorage.auth.user.auth_token;

      return $http.get(API + '/posts/list_subscriptions' + '?auth_token=' + authToken);
    }

    Services.getPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      return $http.get(API + '/posts/' + data.id + '?auth_token=' + authToken);
    }

    Services.followPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      return $http.post(API + '/posts/' + data._id + '/follow' + '?auth_token=' + authToken);
    }

    Services.unFollowPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      return $http.post(API + '/posts/' + data._id + '/unfollow' + '?auth_token=' + authToken);
    }

    return Services;
	}


  angular.module('forum.services', [])
    .factory('ForumServices', ['$http', '$q', '$localStorage', 'API', ForumServices]);
}(window.angular));