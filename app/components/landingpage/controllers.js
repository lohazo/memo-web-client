'use strict';

// Bypass jslint
var angular = window.angular || angular;

angular.module('landingpage.controllers', [])
    .controller('LpCtrl', [
	'$scope',
	'$modal',
	function($scope, $modal) {
	    $scope.courseModal = function() {
		var modalInstance = $modal.open({
		    template: '<div courses-modal></div>',
		    controller: 'CourseModalInstanceCtrl',
		    windowClass: 'course-modal'
		});
	    };
	}
    ])
    .controller('CourseModalInstanceCtrl', [
	'$scope',
	function($scope, $modalInstance) {

	}
    ])
    .controller('LpHeaderCtrl', [
	'$scope',
	'$location',
	'$routeParams',
	'MolServices',
	function($scope, $location, $routeParams, MolServices) {
	    var data = $routeParams;
	    data.preview = '1';
	    mixpanel.track('Web Landingpage page view', data);
	    MolServices.saveC2(data);
	}
    ])
    .controller('LpHeadCtrl', [
	'$scope',
	'$window',
	function($scope, $window) {
	    $scope.toAppStore = function() {
		mixpanel.track('Web iOS CTA 1 to AppStore', {}, function() {
		    $window.location.href ='http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
		});
	    };

	    $scope.toPlayStore = function() {
		mixpanel.track('Web Android CTA 1 to PlayStore', {}, function() {
		    $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
		});
	    };
	}
    ])
    .controller('LpInfoCtrl', [ '$scope', '$window', function($scope, $window) {
	$scope.toAppStore1 = function() {
	    mixpanel.track('Web iOS CTA 2 to AppStore', {}, function() {
		$window.location.href = 'http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
	    });
	};

	$scope.toPlayStore1 = function() {
	    mixpanel.track('Web Android CTA 2 to PlayStore', {}, function() {
		$window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
	    });
	};
    }])
    .controller('LpStatCtrl', [
	'$scope',
	function($scope) {
	}
    ])
    .controller('LpCommentsCtrl', [
	'$scope',
	function($scope) {
	    $scope.comment = {
		user: 'Phương Nguyễn',
		content: 'Ứng dụng quá cool! Ngay cả bé nhà mình cũng thích chơi với kiến Memo :D'
	    };
	}
    ])
    .controller('LpFooterCtrl',	[ '$scope', '$window', function($scope, $window) {
	$scope.toAppStore2 = function() {
	    mixpanel.track('Web iOS CTA 5 to AppStore', {}, function() {
		$window.location.href = 'http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
	    });
	};

	$scope.toPlayStore2 = function() {
	    mixpanel.track('Web Android CTA 5 to PlayStore', {}, function() {
		$window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
	    });
	};
    }]);
