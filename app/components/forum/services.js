(function (angular){
	'use strict';

	function ForumServices($http, $q, $localStorage, API) {
		var Services = {};

		/*
     * data = {auth_token: , page: ,sort: ,type: ,filter: }
     */
    Services.getAllPosts = function() {
    	var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      var requestData = {
        auth_token: auth_token,
        // page: ,
        // sort: ,
        // type: ,
        // filter: 
      };
      $http.get(API + '/posts/all_posts', requestData)
        .then(function (response) {
        	deferred.resolve(response);
        }, function (response) {
        	deferred.reject(response)
        });
      return deferred.promise;
    };
    return Services;
	}

	function ForumFactory(ForumServices, $localStorage) {
		var Forum = {};

		Forum.data = {};

    Forum.getAllPost = function (data) {
    	console.log(data);
    	return Forum.getAllPosts(data).then(function (response) {
    		Forum.data = response.data;
    	});
    };

    return Forum;
	}

  angular.module('forum.services', [])
    .factory('Forum', ['ForumServices', '$localStorage', ForumFactory])
    .factory('ForumServices', ['$http', '$q', '$localStorage', 'API', ForumServices]);

}(window.angular));