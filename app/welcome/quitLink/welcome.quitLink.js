(function (angular) {
  'use strict';

  function WelcomeQuitLinkCtrl($scope, $modal) {
    var ctrl = this;
    ctrl.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'welcome/quitLink/_quit-warning-modal.html',
        controller: 'WelcomeQuitModalCtrl',
        windowClass: 'quit-exam-modal'
      });
    };

    $scope.open = ctrl.open;
  }

  function WelcomeQuitModalCtrl($scope, $modalInstance) {

  }

  function WelcomeQuitLink() {
    return {
      strict: 'EA',
      scope: {
        text: '@quitLinkText'
      },
      controller: 'WelcomeQuitLinkCtrl',
      link: function ($scope, $element, $attr) {
        $element.bind('click', function () {
          $scope.open();
        });
      },
      controllerAs: 'quitLink',
      template: '<a title=""><span ng-bind="text"></span></a>'
    };
  }

  angular.module('welcome.quitLink', [])
    .directive('welcomeQuitLink', WelcomeQuitLink)
    .controller('WelcomeQuitLinkCtrl', ['$scope', '$modal', WelcomeQuitLinkCtrl])
    .controller('WelcomeQuitModalCtrl', ['$scope', '$modalInstance', WelcomeQuitModalCtrl]);
}(window.angular));