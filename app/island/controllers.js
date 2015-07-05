(function (angular) {

	'use strict';
	function IslandMainCtrol($scope, $route, $routeParams, $location, Skill){
		var get_island_data = Skill.skills();
		console.log(get_island_data);

		function get_data_color_skills(start_point, end_point){
			var data_color_skills = [];
			for (var i = start_point; i<=end_point; i++){
				data_color_skills.push(get_island_data[i].theme_color);
			}
			return data_color_skills;
		}

		function get_data_weakest_words(start_point,end_point){
			var data_weakest_words = [];
			for (var i = start_point; i<= end_point; i++){
				data_weakest_words.push(get_island_data[i].strength_gap);
			}
			return data_weakest_words;
		}

		function get_lessons(start_point,end_point){
			var data_lessons = [];
			for (var i = start_point; i<= end_point; i++){
				data_lessons.push(get_island_data[i].lessons.length);
			}
			return data_lessons;

		}



		$scope.check_weakestWord = 'show';
		$scope.param = $routeParams;
		var views=[],data_views = [],line_views = [],islands_data;
		views[0] = {
			skill_height:'height:1950px',
			width_positions : [1,4,2,1,0,3,1,0],
			height_positions : [
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:3
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete:'59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96'],
			icon_type : false,
			icon_url : 'assets/img/skill-pack.png',
			color_skill : get_data_color_skills(0,7)
		};
		views[1] = {
			skill_height:'height:1950px',
			width_positions : [1,4,2,1,0,2,1,0],
			height_positions : [
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete:'59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96'],
			icon_type : false,
			icon_url : 'assets/img/skill-pack.png',
			color_skill : get_data_color_skills(8,15)
		};
		views[2] = {
			skill_height:'height:2800px',
			width_positions : [1,4,2,3,1,0,2,2,0,3,1,0],
			height_positions : [
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:0
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete:'59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96'],
			icon_type : false,
			icon_url : 'assets/img/skill-pack.png',
			color_skill : get_data_color_skills(16,27)
		};
		views[3] = {
			skill_height:'height:3380px',
			width_positions : [1,0,1,1,0,3,1,0,3,1,0,4],
			height_positions : [
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:2
			},
			{
				row:'block',
				height:4
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:3
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:2
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete:'59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96'],
			icon_type : false,
			icon_url : 'assets/img/skill-pack.png',
			color_skill : get_data_color_skills(28,39)
		};
		views[4] = {
			skill_height:'height:3360px',
			width_positions : [1,0,1,0,2,1,0,1,0,4,1,0,2,1,0],
			height_positions : [
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:2
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			},
			{
				row:'block',
				height:1
			},
			{
				row:'inline-block',
				height:-1
			},
			{
				row:'inline-block',
				height:1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete:'59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96'],
			icon_type : false,
			icon_url : 'assets/img/skill-pack.png',
			color_skill : get_data_color_skills(40,54)
		};

		data_views[0] = {
			weakest_word : get_data_weakest_words(0,7),
			lesson : get_lessons(0,7),
			lesson_finish : [3,3,3,3,2,0,0,0],
			section : ['cơ bản 1','cơ bản 2','cơ bản 3','cơ bản','cơ bản','cơ bản','cơ bản','cơ bản'],
			unlocked:[true,true,true,true,true,false,false,false]
		};
		data_views[1] = {
			weakest_word : get_data_weakest_words(8,15),
			lesson : get_lessons(8,15),
			lesson_finish : [3,3,3,3,2,0,0,0],
			section : ['cơ bản 21','cơ bản 22','cơ bản 23','cơ bản 2','cơ bản 2','cơ bản 2','cơ bản 2','cơ bản 2'],
			unlocked:[true,true,true,true,true,false,false,false]
		};
		data_views[2] = {
			weakest_word : get_data_weakest_words(16,27),
			lesson : get_lessons(16,27),
			lesson_finish : [3,3,3,3,4,2,0,0,0,0,0,0],
			section : ['cơ bản 31','cơ bản 32','cơ bản 33','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3'],
			unlocked:[true,true,true,true,true,true,false,false,false,false,false,false]
		};
		data_views[3] = {
			weakest_word : get_data_weakest_words(28,39),
			lesson : get_lessons(28,39),
			lesson_finish : [3,3,3,3,4,2,0,0,0,0,0,0],
			section : ['cơ bản 41','cơ bản 42','cơ bản 43','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4'],
			unlocked:[true,true,true,true,true,true,false,false,false,false,false,false]
		};
		data_views[4] = {
			weakest_word : get_data_weakest_words(40,54),
			lesson : get_lessons(40,54),
			lesson_finish : [3,3,3,3,4,5,6,3,0,0,0,0,0,0,0],
			section : ['cơ bản 51','cơ bản 52','cơ bản 53','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5'],
			unlocked:[true,true,true,true,true,true,true,true,true,false,false,false,false,false,false]
		};

		line_views[0] = {
			points:['270,90 270,270 360,360 450,450 450,585 270,585 270,720','270,720 270,990 90,1170 90,1260 90,1350 270,1530 270,1620'],
			height:'1620',
			points_skill_x : [3,4,3,3,1],
			points_skill_y : [1,4,8,11,14],
			points_skill_type : [1,1,0,-1,-1]
		};
		line_views[1] = {
			points:['270,90 270,270 360,360 450,450 450,585 90,585 90,720','90,720 90,990 180,1080 270,1170 270,1260 270,1440'],
			height:'1440',
			points_skill_x : [3,4,1,2,3],
			points_skill_y : [1,4,8,12,14],
			points_skill_type : [1,1,0,-1,-1]
		};
		line_views[2] = {
			points:['270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,990','270,990 270,1080 180,1170 90,1260 90,1530 180,1620 270,1710 270,1890 270,2160 270,2340'],
			height:'2340',
			points_skill_x : [3,4,3,3,2,2,3,3],
			points_skill_y : [1,4,8,11,13,18,21,24],
			points_skill_type : [1,1,1,0,-1,-1,-1,-1]
		};
		line_views[3] = {
			points:['270,90 270,180 90,360 90,450 90,540 270,720 450,900 450,990, 450,1260','450,1260 450,1350 270,1530 90,1530 90,1710 90,1980 270,1980 270,2070 450,2250 450,2340 450,2430 270,2610 270,2790'],
			height:'2790',
			points_skill_x : [3,1,3,5,5,1,3,5,3],
			points_skill_y : [1,5,8,11,14,19,22,26,29],
			points_skill_type : [1,1,1,1,0,-1,-1,-1,-1]
		};
		line_views[4] = {
			points:['270,90 270,180 90,360 90,450 90,720 270,900 270,1125 450,1125, 450,1260','450,1260 450,1350 360,1440 270,1530 90,1530 90,1800 90,2070 270,2250 270,2520'],
			height:'2520',
			points_skill_x : [3,1,3,5,4,1,3],
			points_skill_y : [1,5,10,14,16,20,25],
			points_skill_type : [1,1,1,0,-1,-1,-1]
		};

		islands_data = {
			skill_total : [8,8,12,12,15],
			skill_finish : [8,8,6,0,0]
		};

		$scope.islandBuilder = {
			skills:{
				view:views,
				data_view:data_views
			},
			line:line_views,
			island_data:islands_data
		}
	}

	angular.module('island.controllers', [])
    .controller('IslandMainCtrol', ['$scope','$route', '$routeParams', '$location', 'Skill', IslandMainCtrol
    ]);

}(window.angular));