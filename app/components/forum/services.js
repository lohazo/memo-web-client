(function (angular){
	'use strict';

	function ForumServices($http, $q, $localStorage, API) {
		var Services = {};

    /*
     * data = {auth_token: , title: , content: , question_log_id: , platform: }
     */
		Services.post = function (data) {
      var deferred = $q.defer();

      var authToken = $localStorage.auth.user.auth_token;

      var requestData = {};
      requestData.title = data.title;
      requestData.content = data.content;
      requestData.auth_token = authToken;
      requestData.question_log_id =  '';
      requestData.platform = 'web';
  	
      $http.post(API + '/posts', requestData)
        .then(function (response) {
          $localStorage.postId = response.data._id;
          deferred.resolve(response);
        });

      return deferred.promise;
    };

    /*
     * data = {auth_token: , id: }
     */
    Services.getPost = function () {
      
    };

    return Services;
	}

	function ForumFactory(ForumServices, $localStorage) {
		var Forum = {};

		Forum.data = {};

		Forum.post = function (data) {
      return ForumServices.post(data).then(function (response) {
        Forum.data = response.data;
      });
    }

    Forum.getPost = function (data) {
      
    };

    return Forum;
	}

  angular.module('forum.services', [])
    .factory('Forum', ['ForumServices', '$localStorage', ForumFactory])
    .factory('ForumServices', ['$http', '$q', '$localStorage', 'API', ForumServices]);

}(window.angular));