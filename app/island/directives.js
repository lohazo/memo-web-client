(function (angular) {
	'use strict';

	angular.module('island.directives',[])
		.directive('appIsland',function(){
			return {
				strict:"EA",
				scope:true,
				controller:'IslandCtrl',
				templateUrl:'island/_island-main.html'
			}
		})
		.directive('islandLeft',function(){
			return {
				strict:"EA",
				scope:true,
				templateUrl:'island/_island-left.html'
			}
		})
		.directive('islandCenter',function(){
			return {
				strict:"EA",
				scope:true,
				templateUrl:'island/_island-center.html'
			}
		})
		.directive('islandRight',function(){
			return {
				strict:"EA",
				scope:true,
				templateUrl:'island/_island-right.html'
			}
		})


}(window.angular));