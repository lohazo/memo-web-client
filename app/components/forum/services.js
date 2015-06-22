(function (angular) {
  'use strict';
  /*jslint browser: true*/

  function ForumServices($http, $localStorage, API, $location) {
    var Services = {};
    var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';

    /*
     * data = {title: , content: , base_course_id: , [questtion_log_id: ]}
     */

    Services.createPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      data.auth_token = authToken;
      data.platform = 'web';
      return $http.post(API + '/posts?platform=web&localize=' + localize, data);
    };

    Services.getListSubscription = function () {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts/list_subscriptions?platform=web&localize=' + localize;

      endpoint += authToken.length > 0 ? '&auth_token=' + authToken : '';

      return $http.get(endpoint);
    };

    // data = {id:, slug:}
    Services.getPost = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts';
      
      endpoint += data.id ? '/' + data.id + '?platform=web&localize=' + localize : '';
      endpoint += data.slug ? '/post_details?slug=' + data.slug + '&platform=web&localize=' + localize : '';

      if (authToken.length > 0) {
        endpoint += data.id ? '&auth_token=' + authToken : '';
        endpoint += data.slug ? '&auth_token=' + authToken : '';
      }

      return $http.get(endpoint);
    };

    Services.followPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.post(API + '/posts/' + data._id + '/follow' + '?platform=web&localize=' + localize + '&auth_token=' + authToken);
    };

    Services.unFollowPost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;
      return $http.post(API + '/posts/' + data._id + '/unfollow' + '?platform=web&localize=' + localize + '&auth_token=' + authToken);
    };

    Services.votePost = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
      return $http.post(API + '/posts/' + data.id + '/vote?platform=web&localize=' + localize, data, {
        ignoreLoadingBar: true
      });
    };

    Services.listComment = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';

      var endpoint = API + '/posts/' + data.id + '/comments?platform=web&localize=' + localize;

      endpoint += authToken.length > 0 ? "&auth_token=" + authToken : '';
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
      data.localize = localize;

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
      data.localize = localize;
      data.post_id = data.id;

      return $http.post(API + '/comments', data);
    };

    // data = {id: ,type: 'upvote'/'downvote', vote: true/false}
    Services.voteComment = function (data) {
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;
      data.platform = 'web';
      data.localize = localize;

      return $http.post(API + '/comments/' + data.id + '/vote', data, {
        ignoreLoadingBar: true
      });
    };

    // data = {[page: , sort: 'created_at', type: 'desc'/'asc', filter: "all"/"follow"/"en-vi"/"fr-vi"/"de-vi"]}
    Services.listPosts = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/posts/all_posts' + '?platform=web&localize=' + localize;

      endpoint += authToken.length > 0 ? '&auth_token=' + authToken : '';
      endpoint += data.page ? '&page=' + data.page : '';
      endpoint += data.sort ? '&sort=' + data.sort : '';
      endpoint += data.type ? '&type=' + data.type : '';
      endpoint += data.filter ? '&filter=' + data.filter : '';

      return $http.get(endpoint);
    };

    Services.listReply = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      var endpoint = API + '/comments/' + data.id + '?platform=web&localize=' + localize;

      endpoint += authToken.length > 0 ? '&auth_token=' + authToken : '';
      endpoint += data.page ? '&page=' + data.page : '';

      return $http.get(endpoint);
    };

    // data = {keywords: ''}
    Services.searchPosts = function (data) {
      var authToken = $localStorage.auth.user ? $localStorage.auth.user.auth_token : '';
      data.auth_token = authToken;
      data.platform = 'web';
      data.localize = localize;

      return $http.post(API + '/posts/search_all_post', data);
    };

    return Services;
  }

  angular.module('forum.services', [])
    .factory('ForumServices', ['$http', '$localStorage', 'API', '$location', ForumServices]);
}(window.angular));