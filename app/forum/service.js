// (function (angular) {

//   'use strict';

//   function createpost($http, $q, $localStorage, API) {
//     var deferred = $q.defer();
//       var API = 'http://staging.memo.edu.vn/v2/api';
//       var authToken = '_MZzG2wmLYej5x34';
//       $http.get(API + '/forum/posts/all_posts=' + authToken)
//         .then(function (response) {
//           deferred.resolve(response);
//         });
//       return deferred.promise;
//   }



// }(window.angular));