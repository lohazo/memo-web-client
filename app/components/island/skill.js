'use strict';

angular.module('island.tree', [])
	.factory('islandBuilder', ['$localStorage', function($localStorage){
		var islandBuilder = {};
		islandBuilder.skill = {
			points:'41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			width_position_total:4,
			width_position:1,
			height:1,
			weakest_word:4,
			icon:'assets/img/skill-pack.png',
			icon_number:1,
			icon_type:false,
			lesson:3,
			lesson_finish:3,
			section:'cơ bản 1',
			fill:'#ffba33'
		};
		islandBuilder.line = {};
		
	}])
			//"Skill:"
			// points:'41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			// width_position_total:5,
			// width_position:2,						data
			// height_position:1,					data
			// weakest_word:3,						data
			// icon_type:false,						data
			// icon:'assets/img/skill-pack.png',
			// icon_number:1,							data
			// lesson:3,								data
			// lesson_finish:3,						data
			// section:'cơ bản 1',					data
			// fill:'#ffba33'							data
			// 


			// width_positions:[1,4,2,1,3,3,1,3,'done'],
			// height:[1,3,5,8,8,11,14,14,19],









