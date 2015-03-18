(function (angular){
	'use strict';

	function ForumServices($http, $q, $localStorage, API) {
		var Services = {};
		Services.post = function (data) {
      var deferred = $q.defer();
      console.log(data.title);
      var authToken = $localStorage.auth.user.auth_token;
      var requestData = {};
      requestData.title = data.title;
      requestData.content = data.content;
      requestData.auth_token = authToken;
      requestData.question_log_id =  '';
      requestData.platform = 'web';
  	
      $http.post(API + '/posts', requestData)
        .then(function (response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    };
    return Services;
	}

	function ForumFactory(ForumServices, $localStorage) {
		var Forum = {};

		Forum.data = {};

		// Forum.post = function () {
  //     return ForumServices.post().then(function (response) {
  //     });
  //   };
    return Forum;
	}

  angular.module('forum.services', [])
    .factory('Forum', ['ForumServices', '$localStorage', ForumFactory])
    .factory('ForumServices', ['$http', '$q', '$localStorage', 'API', ForumServices]);

}(window.angular));