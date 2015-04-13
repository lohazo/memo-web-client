(function (angular) {
  'use strict';
  /*jslint browser: true*/

  function ForumServices($http, $localStorage, API) {
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
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts/list_subscriptions';

      endpoint += authToken.length > 0 ? '?auth_token=' + authToken : '';

      return $http.get(endpoint);
    };

    // data = {id:, slug:}
    Services.getPost = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts';

      endpoint += data.id ? '/?' : '';
      endpoint += data.slug ? '/post_details?slug=' + data.slug + '&' : '';
      endpoint += (authToken.length > 0) ? 'auth_token=' + authToken : '';
      return $http.get(endpoint);
    };

    Services.followPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.post(API + '/posts/' + data._id + '/follow' + '?auth_token=' + authToken);
    };

    Services.unFollowPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.post(API + '/posts/' + data._id + '/unfollow' + '?auth_token=' + authToken);
    };

    Services.votePost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
      return $http.post(API + '/posts/' + data.id + '/vote', data, {
        ignoreLoadingBar: true
      });
    };

    Services.listComment = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';

      var endpoint = API + '/posts/' + data.id + '/comments';

      endpoint += authToken.length > 0 ? "?auth_token=" + authToken : '';
      endpoint += data.page ? '&page=' + data.page : '';

      return $http.get(endpoint);
    };

    /*
     * data = {post_id: , parent_comment_id: , content:}
     */
    Services.createReply = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;
      data.platform = 'web';

      return $http.post(API + '/comments', data);
    };

    // Services.listComments = function (data) {
    //   var authToken = $localStorage.auth.user.auth_token;

    //   return $http.get(API + '/comments/' + data.id ,data);
    // };

    Services.creatComment = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
      data.post_id = data.id;

      return $http.post(API + '/comments', data);
    };

    // data = {id: ,type: 'upvote'/'downvote', vote: true/false}
    Services.voteComment = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';

      return $http.post(API + '/comments/' + data.id + '/vote', data, {
        ignoreLoadingBar: true
      });
    };

    // data = {[page: , sort: 'created_at', type: 'desc'/'asc', filter: "all"/"follow"/"en-vi"/"fr-vi"/"de-vi"]}
    Services.listPosts = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts/all_posts' + '?platform=web';

      endpoint += authToken.length > 0 ? '&auth_token=' + authToken : '';
      endpoint += data.page ? '&page=' + data.page : '';
      endpoint += data.sort ? '&sort=' + data.sort : '';
      endpoint += data.type ? '&type=' + data.type : '';
      endpoint += data.filter ? '&filter=' + data.filter : '';

      return $http.get(endpoint);
    };

    Services.listReply = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/comments/' + data.id + '?platform=web';

      endpoint += authToken.length > 0 ? '&auth_token=' + authToken : '';
      endpoint += data.page ? '&page=' + data.page : '';

      return $http.get(endpoint);
    };

    // data = {keywords: ''}
    Services.searchPosts = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      data.auth_token = authToken;

      return $http.post(API + '/posts/search_all_post', data);
    };

    return Services;
  }

  angular.module('forum.services', [])
    .factory('ForumServices', ['$http', '$localStorage', 'API', ForumServices]);
}(window.angular));