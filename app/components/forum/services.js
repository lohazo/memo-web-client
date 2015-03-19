(function (angular){
  'use strict';

  function ForumServices($http, $q, $localStorage, API) {
    var Services = {};

    /*
     * data = {title: , content: , base_course_id: , [questtion_log_id: ]}
     */
     Services.createPost = function (data, subscriptionId) {
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;
      data.platform = 'web';
      return $http.post(API + '/posts', data);
    };

    Services.getListSubscription = function () {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.get(API + '/posts/list_subscriptions' + '?auth_token=' + authToken)
    };

    Services.getPost = function () {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.get(API + '?auth_token=' + authToken)
    };

    Services.listPosts = function () {
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;
      // data.page = 0;
      // data.sort = '';
      // data.type = '';
      // data.filter = '';
    
      return $http.get(API + '/posts/all_posts', data)

    };

    return Services;
  }

  angular.module('forum.services', [])
  .factory('ForumServices', ['$http', '$q', '$localStorage', 'API', ForumServices]);
}(window.angular));

