(function (angular) {
  'use strict';

  function weakestWordConfig($routeProvider) {
  	$routeProvider.when('/weakestword', {
  		templateUrl: 'exam/weakestWord/_weakest-word.html',
  		controller: 'ListWeakestWordCtrl'
  	});
  	$routeProvider.when('/weakestword/:id', {
  		templateUrl: 'exam/weakestWord/_weakest-word-detail.html',
  		controller: 'WeakestWordDetailCtrl'
  	});
  }

  function ListWeakestWordCtrl($scope, WeakestWordServices) {
    // WeakestWordServices.listWeakestWord().success(function (data) {
    // });
    $scope.weakest_words = {
      "words":[
        {"text": "a",
         "skills": "Cơ bản 1",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "một"},
           {"text": "một cái"},
           {"text": "một vài"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I am a girl"},
           {"text": "She is a girl"}
          ],
        },
        {"text": "an",
         "skills": "Cơ bản 2",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 2,
         "translation":[
           {"text": "một"},
           {"text": "một vài"},
           {"text": "một cái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I have an apple"},
           {"text": "She has an orange"}
          ],
        },
        {"text": "the",
         "skills": "Cụm từ",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 1,
         "translation":[
           {"text": "một"},
           {"text": "một vài"},
           {"text": "một cái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I have an apple"},
           {"text": "She has an orange"}
          ],
        },
        {"text": "man",
         "skills": "Món ăn",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 3,
         "translation":[
           {"text": "đàn ông"},
           {"text": "quý ông"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "đàn ông",
         "examples": [
           {"text": "I am a man"},
           {"text": "The man is running"}
          ],
        },
        {"text": "woman",
         "skills": "Số nhiều",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "phụ nữ"},
           {"text": "quý bà"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "phụ nữ",
         "examples": [
           {"text": "She is a woman"},
           {"text": "Woman is beautiful as flower"}
          ],
        },
        {"text": "boy",
         "skills": "Sở hữu",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 2,
         "translation":[
           {"text": "cậu bé"},
           {"text": "con trai"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cậu bé",
         "examples": [
           {"text": "He is a boy"},
           {"text": "He is my boyfriend"}
          ],
        },
        {"text": "girl",
         "skills": "Màu sắc",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 1,
         "translation":[
           {"text": "cô bé"},
           {"text": "con gái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cô bé",
         "examples": [
           {"text": "She is a girl"},
           {"text": "She is my girlfriend"}
          ],
        },
        {"text": "refrigerator",
         "skills": "Giới từ",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "cô bé"},
           {"text": "con gái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cô bé",
         "examples": [
           {"text": "She is a girl"},
           {"text": "She is my girlfriend"}
          ],
        },
      ],
      "next_page":2,
      "total_page":2,
      "title":"Từ vựng yếu",
      "content":"",
      "submit_button":"CỦNG CỐ"
      }
    };

  function WeakestWordDetailCtrl($scope, WeakestWordServices) {
    // WeakestWordServices.listWeakestWord().success(function (data) {
    // });
    $scope.weakest_words = {
      "words":[
        {"text": "a",
         "skills": "Cơ bản 1",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "một"},
           {"text": "một cái"},
           {"text": "một vài"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I am a girl"},
           {"text": "She is a girl"}
          ],
        },
        {"text": "an",
         "skills": "Cơ bản 2",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 2,
         "translation":[
           {"text": "một"},
           {"text": "một vài"},
           {"text": "một cái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I have an apple"},
           {"text": "She has an orange"}
          ],
        },
        {"text": "the",
         "skills": "Cụm từ",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 1,
         "translation":[
           {"text": "một"},
           {"text": "một vài"},
           {"text": "một cái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "một",
         "examples": [
           {"text": "I have an apple"},
           {"text": "She has an orange"}
          ],
        },
        {"text": "man",
         "skills": "Món ăn",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 3,
         "translation":[
           {"text": "đàn ông"},
           {"text": "quý ông"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "đàn ông",
         "examples": [
           {"text": "I am a man"},
           {"text": "The man is running"}
          ],
        },
        {"text": "woman",
         "skills": "Số nhiều",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "phụ nữ"},
           {"text": "quý bà"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "phụ nữ",
         "examples": [
           {"text": "She is a woman"},
           {"text": "Woman is beautiful as flower"}
          ],
        },
        {"text": "boy",
         "skills": "Sở hữu",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 2,
         "translation":[
           {"text": "cậu bé"},
           {"text": "con trai"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cậu bé",
         "examples": [
           {"text": "He is a boy"},
           {"text": "He is my boyfriend"}
          ],
        },
        {"text": "girl",
         "skills": "Màu sắc",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 1,
         "translation":[
           {"text": "cô bé"},
           {"text": "con gái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cô bé",
         "examples": [
           {"text": "She is a girl"},
           {"text": "She is my girlfriend"}
          ],
        },
        {"text": "refrigerator",
         "skills": "Giới từ",
         "last_study": "10-03-2015, 17:25:11",
         "strength_gap": 4,
         "translation":[
           {"text": "cô bé"},
           {"text": "con gái"}
          ],
         "speaker": "http://admin.memo.edu.vn/uploads/sentence/audio/normal/normal-54d2f4316d61696c798e0800.mp3",
         "maining": "cô bé",
         "examples": [
           {"text": "She is a girl"},
           {"text": "She is my girlfriend"}
          ],
        },
      ],
      "next_page":2,
      "total_page":2,
      "title":"Từ vựng yếu",
      "content":"",
      "submit_button":"CỦNG CỐ"
      }
    };
  }

  function WeakestWordServices($http, $q, $localStorage, API) {
    var Services = {};

    /*
     * data = {skill_id: , page: }
     */
    Services.listWeakestWord = function(data) {
      var authToken = $localStorage.auth.user.auth_token;
      var userId = $localStorage.auth.user._id;

      var endpoint = API + '/users/' + userId + '/weakest_word' + '?platform=web&auth_token=' + authToken;

      // if (data.page) endpoint += '&page=' + data.page;
      // if (data.skill_id) endpoint += '&sort=' + data.skill_id;

      return $http.get(endpoint);
    };

    return Services;
  }
  

  angular.module('weakestWord', [])
    .config(['$routeProvider', weakestWordConfig])
    .controller('ListWeakestWordCtrl', ['$scope', 'WeakestWordServices', ListWeakestWordCtrl])
    .controller('WeakestWordDetailCtrl', ['$scope', 'WeakestWordServices', WeakestWordDetailCtrl])
    .factory('WeakestWordServices', ['$http', '$q', '$localStorage', 'API', WeakestWordServices])
}(window.angular));