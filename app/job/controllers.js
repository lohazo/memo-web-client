(function (angular) {
	'use strict';

	function ListJobCtrl ($scope) {

	}

	function JobDetailCtrl ($scope) {
		
	}

	angular.module('job.controllers', ['job.services'])
    .controller('ListJobCtrl', ['$scope', ListJobCtrl
    ])
    .controller('JobDetailCtrl', ['$scope',
      JobDetailCtrl
    ]);

}(window.angular));