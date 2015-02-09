(function (angular) {
  'use strict';

  function ProgressQuizQuitLinkCtrl($scope, $modal) {
    var ctrl = this;
    ctrl.hide = $scope.hide;
    ctrl.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'exam/progressQuiz/quitLink/_quit-warning-modal.html',
        controller: 'ProgressQuizQuitModalCtrl',
        windowClass: 'quit-exam-modal'
      });

      modalInstance.result.then(function (message) {
        if (message === 'skipProgressQuiz') {
          $scope.skip();
        }
      });
    };

    $scope.open = ctrl.open;
  }

  function ProgressQuizQuitModalCtrl($scope, $modalInstance) {
    $scope.close = function () {
      $modalInstance.dismiss();
    };

    $scope.quit = function () {
      $modalInstance.close('skipProgressQuiz');
    }
  }

  function ProgressQuizQuitLink() {
    return {
      strict: 'EA',
      scope: {
        text: '@quitLinkText',
        hide: '=quitLinkHide',
        skip: '&'
      },
      replace: true,
      controller: 'ProgressQuizQuitLinkCtrl',
      controllerAs: 'quitLink',
      link: function ($scope, $element, $attr) {
        $element.bind('click', function () {
          $scope.open();
        });
      },
      template: ['<a title="" ng-class="{\'hide\': hide}">',
        '<span ng-bind="text" style="line-height:80px;font-size:22px;"></span>', '</a>'
      ].join('')
    };
  }

  angular.module('adaptiveTest.progressQuiz.quitLink', [])
    .directive('progressQuizQuitLink', ProgressQuizQuitLink)
    .controller('ProgressQuizQuitLinkCtrl', ['$scope', '$modal', ProgressQuizQuitLinkCtrl])
    .controller('ProgressQuizQuitModalCtrl', ['$scope', '$modalInstance', 'ProgressQuiz',
      ProgressQuizQuitModalCtrl
    ]);
}(window.angular));