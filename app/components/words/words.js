(function (angular) {
  'use strict';

  function WordsFactory($http, $q, $localStorage, API, API_PHP) {
    var Factory = {};

    Factory.getWord = function (wordToSearch) {
      var words = $localStorage.words.words;
      var lang = $localStorage.auth.user.current_course_id;
      return words.filter(function (word) {
        return (lang + '_' + wordToSearch) === word._id;
      })[0];
    };

    Factory.getWords = function () {

      var deferred = $q.defer();
      var words = $localStorage.words || {};
      var version = words.version || 0;

      $http.get(API + '/shared_settings/all_words.json?version=' + version, {ignoreLoadingBar: true})
        .then(function (response) {
          if (version != response.data.version) {
            $localStorage.words = response.data;
          }
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    Factory.revealWords = function (data) {
      // data = {words: ['en-vi_a', 'en-vi_x']}
      var deferred = $q.defer();
      var authToken = $localStorage.auth.user.auth_token;

      data.auth_token = authToken;

      $http.post(API_PHP + '/words?', data, {ignoreLoadingBar: true})
        .then(function (response) {
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return Factory;
  }

  angular.module('words', []);
  angular.module('words')
    .factory('Words', ['$http', '$q', '$localStorage', 'API', 'API_PHP', WordsFactory]);
}(window.angular));