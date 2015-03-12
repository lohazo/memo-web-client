(function (angular) {
  'use strict';

  function MessageListCtrl($scope, $modal, $localStorage, Message) {
    var messages = $localStorage.messages;
    if (!messages) return;
    $scope.messages = messages;
    $scope.shouldOpen = messages.message_ids && messages.message_ids.length > 0;
    if ($scope.shouldOpen) {
      var modalInstance = $modal.open({
        template: '<div message-content></div>',
        controller: 'MessageModalInstanceCtrl',
        backdrop: 'static',
        keyboard: false,
        windowClass: 'message-modal',
        resolve: {
          messages: function () {
            return $scope.messages;
          },
        }
      });
    }
  }

  function MessageModalInstanceCtrl($scope, $modalInstance, Message, messages) {
    $scope.messages = messages;
    $scope.close = function () {
      Message.open(messages);
      $modalInstance.close();
    };
  }

  angular.module('message.directives', [])
    .directive('messageList', function () {
      return {
        strict: 'EA',
        scope: true,
        controller: 'MessageListCtrl',
        link: function ($scope, $element, $attr) {
          $scope.closeMessageList = function () {
            $scope.shouldOpen = false;
            $scope.openMessage($scope.messages);
          }
        }
      };
    })
    .directive('messageContent', function ($compile) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'components/message/_messages.html',
        link: function ($scope, $element, $attrs) {
          $scope.$watch('messages', function () {
            $element.html($scope.messages.message_html);
            $compile($element.contents())($scope);
          });
        }
      };
    }).
  controller('MessageListCtrl', ['$scope', '$modal', '$localStorage', 'Message', MessageListCtrl])
    .controller('MessageModalInstanceCtrl', ['$scope', '$modalInstance', 'Message', 'messages',
      MessageModalInstanceCtrl
    ]);
}(window.angular));