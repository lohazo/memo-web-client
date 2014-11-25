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
	    //mixpanel.track('Web 1.0.2 Landingpage page view', data);
	    MolServices.saveC2(data);
	}
    ])
    .controller('LpHeadCtrl', [
	'$scope',
	'$window',
	function($scope, $window) {
	    $scope.toAppStore = function() {
	    	$window.location.href ='http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
		//mixpanel.track('Web 1.0.2 iOS CTA 1 to AppStore', {}, function() {});
	    };

	    $scope.toPlayStore = function() {
	    	$window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
		//mixpanel.track('Web 1.0.2 Android CTA 1 to PlayStore', {}, function() {});
	    };
	}
    ])
    .controller('LpInfoCtrl', [ '$scope', '$window', function($scope, $window) {
	$scope.toAppStore1 = function() {
	    $window.location.href = 'http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
	    //mixpanel.track('Web 1.0.2 iOS CTA 2 to AppStore', {}, function() {});
	};

	$scope.toPlayStore1 = function() {
	    $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
	    //mixpanel.track('Web 1.0.2 Android CTA 2 to PlayStore', {}, function() {});
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
		$window.location.href = 'http://appvn.com/ios/tai-game-iphone/topica-memo-hoc-ngoai-ngu-mien-phi/30762';
	    //mixpanel.track('Web 1.0.2 iOS CTA 5 to AppStore', {}, function() {});
	};

	$scope.toPlayStore2 = function() {
	    $window.location.href = 'https://play.google.com/store/apps/details?id=vn.topica.memo';
	    //mixpanel.track('Web 1.0.2 Android CTA 5 to PlayStore', {}, function() {});
	};
    }]);
