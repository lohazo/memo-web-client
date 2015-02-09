(function (angular) {
  'use strict';

  function WelcomeQuitLinkCtrl($scope, $modal) {
    var ctrl = this;
    ctrl.hide = $scope.hide;
    ctrl.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'welcome/quitLink/_quit-warning-modal.html',
        controller: 'WelcomeQuitModalCtrl',
        windowClass: 'quit-exam-modal'
      });

      modalInstance.result.then(function (message) {
        if (message === 'skipTour') {
          $scope.skip();
        }
      });
    };

    $scope.open = ctrl.open;
  }

  function WelcomeQuitModalCtrl($scope, $modalInstance) {
    $scope.close = function () {
      $modalInstance.dismiss();
    };

    $scope.quit = function () {
      $modalInstance.close('skipTour');
    }
  }

  function WelcomeQuitLink() {
    return {
      strict: 'EA',
      scope: {
        text: '@quitLinkText',
        hide: '=quitLinkHide',
        skip: '&'
      },
      replace: true,
      controller: 'WelcomeQuitLinkCtrl',
      controllerAs: 'quitLink',
      link: function ($scope, $element, $attr) {
        $element.bind('click', function () {
          $scope.open();
        });
      },
      template: ['<a title="" ng-class="{\'hide\': hide}">',
        '<span ng-bind="text" style="line-height:80px;"></span>',
        '</a>'
      ].join('')
    };
  }

  angular.module('welcome.quitLink', [])
    .directive('welcomeQuitLink', WelcomeQuitLink)
    .controller('WelcomeQuitLinkCtrl', ['$scope', '$modal', WelcomeQuitLinkCtrl])
    .controller('WelcomeQuitModalCtrl', ['$scope', '$modalInstance', 'Welcome',
      WelcomeQuitModalCtrl
    ]);
}(window.angular));