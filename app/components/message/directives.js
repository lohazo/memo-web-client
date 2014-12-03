'use strict';
angular.module('message.directives', [])
    .directive('messageList', function($localStorage) {
        return {
            strict: 'EA',
            scope: true,
            link: function($scope, $element, $attr) {
                var messages = $localStorage.messages;
                $scope.shouldOpen = messages && messages.length > 0;
                $scope.closeMessageList = function() {
                    $scope.shouldOpen = false;
                }
            },
            templateUrl: 'components/message/_messages.html'
        };
    });