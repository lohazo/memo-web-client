(function (angular){
	'use strict';

	angular.module('island.directives',[])
		.directive('appIsland',function(){
			return {
				strict:"EA",
				scope:true,
				controller:'IslandMainCtrol',
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
				controller:'islandRightCtrl',
				templateUrl:'island/_island-right.html'
			}
		})
		.directive('skillSvg',function(){
			return {
				strict:'EA',
				scope:true,
				templateUrl:'island/_skill.html'
			}
		})
}(window.angular))

