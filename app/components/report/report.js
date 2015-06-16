'use strict';

angular.module('report', [])
  .factory('ReportServices', [
    '$http', '$q', '$localStorage', 'API', '$location',
    function ($http, $q, $localStorage, API, $location) {

      return {
        reportBug: function (data) {
          var deferred = $q.defer();
          var requestData = {};
          var localize = ["topicamemo.com", "memo.topica.asia"].indexOf($location.host()) > -1 ? 'th' : 'vi';
          requestData.feedback = data.content;
          requestData.auth_token = $localStorage.auth.user.auth_token;
          requestData.platform = 'web';
          requestData.version = '1.0.3';
          requestData.localize = localize;
          $http.post(API + '/feedbacks/report_bugs', requestData)
            .then(function (response) {
              deferred.resolve(response);
            });

          return deferred.promise;
        }
      };
    }
  ])
  .directive('systemReport', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'components/report/_report.html'
    };
  })
  .directive('systemReportPopup', function () {
    return {
      strict: 'EA',
      scope: true,
      templateUrl: 'components/report/_report-popup.html'
    };
  })
  .controller('ReportCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.reportPopup = function () {
      var modalInstance = $modal.open({
        template: '<system-report-popup></system-report-popup>',
        controller: 'ReportPopupCtrl',
        windowClass: 'report-popup'
      });
    };
  }])
  .controller('ReportPopupCtrl', [
    '$scope', '$modalInstance', 'ReportServices',
    function ($scope, $modalInstance, ReportServices) {
      $scope.data = {
        content: ''
      };
      $scope.reportBug = function () {
        ReportServices.reportBug($scope.data)
          .then(function () {
            $modalInstance.close();
          });
      };
      $scope.dismissReport = function () {
        $modalInstance.dismiss('cancel');
      };
      $scope.cancel = function () {
        document.getElementById("cleartext").value = "";
      };
    }
  ]);