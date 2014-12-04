'use strict';
angular.module('message.directives', [])
    .directive('messageList', function($localStorage) {
        return {
            strict: 'EA',
            scope: true,
            controller: 'MessageListCtrl',
            link: function($scope, $element, $attr) {
                var messages = $localStorage.messages;
                $scope.shouldOpen = messages && messages.message_ids.length > 0;
                $scope.closeMessageList = function() {
                    $scope.shouldOpen = false;
                    $scope.openMessage(messages);
                }
            },
            templateUrl: 'components/message/_messages.html'
        };
    }).
    controller('MessageListCtrl', ['$scope', 'Message', function($scope, Message) {
        $scope.openMessage = function(messages) {
            Message.open(messages);
        };
    }]);