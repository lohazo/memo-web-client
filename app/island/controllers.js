(function (angular) {

	'use strict';
	function IslandMainCtrol($scope, $route, $routeParams, $location, Skill, Plaza){
		$scope.skills = Skill.skills();		
		$scope.check_weakestWord = 'show';
		$scope.param = $routeParams;
		var views=[],data_views = [],line_views = [],islands_data;
		var each_point_element = [[1,2,2,1,2],[1,2,2,1,2],[1,2,1,2,1,2,1,2],[2,1,0,2,1,2,1,2,1],[2,2,3,2,1,2,3]];
		var each_island_skill = [[0,7],[8,15],[16,27],[28,39],[40,54]];
		var island_skill_number = [8,8,12,12,15];
		var points_line_island = [];
		points_line_island = {
			points:['270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,990 90,1170 90,1260 90,1350 270,1530 270,1620',
		'270,90 270,270 360,360 450,450 450,585 90,585 90,720 90,990 180,1080 270,1170 270,1260 270,1440',
		'270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,1080 180,1170 90,1260 90,1530 180,1620 270,1710 270,1890 270,2160 270,2340',
		'270,90 270,180 90,360 90,450 90,540 270,720 450,900 450,990, 450,1260 450,1350 270,1530 90,1530 90,1710 90,1980 270,1980 270,2070 450,2250 450,2340 450,2430 270,2610 270,2790',
		'270,90 270,180 90,360 90,450 90,720 270,900 270,1125 450,1125, 450,1260 450,1350 360,1440 270,1530 90,1530 90,1800 90,2070 270,2250 270,2520'],
		position_x:[[3,4,3,3,1],[3,4,1,2,3],[3,4,3,3,2,2,3,3],[3,1,3,5,5,1,3,5,3],[3,1,3,5,4,1,3]],
		position_y:[[1,4,8,11,14],[1,4,8,12,14],[1,4,8,11,13,18,21,24],[1,5,8,11,14,19,22,26,29],[1,5,10,14,16,20,25]]
		}

		$scope.conver_int_eleven = function(number){
			return parseInt(number/11);
		}
		
		$scope.conver_surplus_eleven = function(number){
			return number%11;
		}

		$scope.get_number_skill_before = function(){
			
			var data_number_skill_before = 0;
			for (var i = 0; i<$scope.param.id-1; i++){
				data_number_skill_before += island_skill_number[i];
			}
			return data_number_skill_before;
		}

	//function conver du lieu
		//du lieu phan data_view
		function get_ids(each_island_skill){
			var data_ids = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_ids.push($scope.skills[i]._id);
			}
			return data_ids;
		}
		
		function get_weakest_words(each_island_skill){
			var data_weakest_words = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_weakest_words.push($scope.skills[i].strength_gap);
			}
			return data_weakest_words;
		}
		
		function get_lessons(each_island_skill){
			var data_lessons = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_lessons.push($scope.skills[i].lessons.length);
			}
			return data_lessons;
		}

		function get_lesson_finishs(each_island_skill){
			var data_lesson_finishs = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_lesson_finishs.push($scope.skills[i].finished_lesson);
			}
			return data_lesson_finishs;
		}

		function get_sections(each_island_skill){
			var data_sections = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_sections.push($scope.skills[i].slug);
			}
			return data_sections;
		}

		function get_unlockeds(each_island_skill){
			var data_unlockeds = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_unlockeds.push($scope.skills[i].unlocked);
			}
			return data_unlockeds;
		}

		function get_color_skills(each_island_skill){
			var data_color_skills = [];
			for (var i = each_island_skill[0]; i <= each_island_skill[1]; i++){
				data_color_skills.push($scope.skills[i].theme_color);
			}
			return data_color_skills;
		}
		
		// du lieu phan island_data
		function get_skill_finish_each_islands(){
			var total_finish_skills = 0, data_skill_finish_each_islands = [];
			for(var i = 0; i < $scope.skills.length; i++){
				if ($scope.skills[i].finished_lesson == $scope.skills[i].lessons.length) {
					total_finish_skills++;
				}
			}
			for (var i = 0; i < island_skill_number.length; i++){
				if (total_finish_skills >= island_skill_number[i]) {
					data_skill_finish_each_islands.push(island_skill_number[i]);
					total_finish_skills -= island_skill_number[i];
				}
				else{
					data_skill_finish_each_islands.push(total_finish_skills);
					total_finish_skills=0;
				}
			}
			return data_skill_finish_each_islands;
		}
		
		function get_skill_unlocked_each_islands(){
			var total_unlocked_skills = 0, data_skill_unlocked_each_islands = [];
			for (var i = 0 ; i < $scope.skills.length; i++){
				if($scope.skills[i].unlocked){
					total_unlocked_skills++;
				}
			}
			for (var i = 0 ; i < island_skill_number.length; i++){
				if (total_unlocked_skills >= island_skill_number[i]) {
					data_skill_unlocked_each_islands.push(island_skill_number[i]);
					total_unlocked_skills -= island_skill_number[i];
				}
				else{
					data_skill_unlocked_each_islands.push(total_unlocked_skills);
					total_unlocked_skills=0;
				}
			}
			return data_skill_unlocked_each_islands;
		}
	
		//du lieu phan line
		function get_points_skill_types(each_point_element , each_island_skill){
			var data_points_array = [], k = each_island_skill[0], data_points_skill_types = [];
			for (var i = 0; i < each_point_element.length; i++){
				data_points_array[i] = [];
				if (each_point_element[i]==0) {
					if(data_points_array[i-1]==2){
						data_points_array[i].push(2);
					}
					else{
						data_points_array[i].push(0);
					}
				}
				else{
					for(var j = 0 ; j < each_point_element[i]; j++){
						if($scope.skills[k].lessons.length == $scope.skills[k].finished_lesson){
							data_points_array[i].push(2);
						}
						else if($scope.skills[k].unlocked){
							data_points_array[i].push(1);
						}
						else{
							data_points_array[i].push(0);
						}
						k++;
					}
				}
			}
			for(var i = 0; i< data_points_array.length ; i++) {
			if (data_points_array[i].indexOf(0) >= 0) {
				data_points_skill_types.push(-1);
			} else if (data_points_array[i].indexOf(1) >=0) {
				data_points_skill_types.push(0);
			} else {
				data_points_skill_types.push(1);
			}
		}
			return data_points_skill_types;
		}
		$scope.check_point_red = 4;
		function get_points_lines(get_points_skill_types, index_line){
			var position_red = get_points_skill_types.indexOf(0);
			var complete_lines = points_line_island.points[index_line];
			if (position_red>=0) {
				var position_x = points_line_island.position_x[index_line][position_red];
				var position_y = points_line_island.position_y[index_line][position_red];
				var point_break = position_x*90+','+position_y*90;
				var position_break = complete_lines.indexOf(point_break);
				$scope.check_point_red=index_line;
				return complete_lines.substring(position_break);
			}
			else if(index_line<$scope.check_point_red){
				return '';
			}
			else{
				return complete_lines;
			}
			
			
		}
		
	//end function conver du lieu

		
		views[0] = {
			skill_height : 'height : 1950px',
			width_positions : [1,4,2,1,0,3,1,0],
			height_positions : [
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 3
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete : '59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96']
		};
		views[1] = {
			skill_height : 'height : 1950px',
			width_positions : [1,4,2,1,0,2,1,0],
			height_positions : [
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete : '59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96']
		};
		views[2] = {
			skill_height : 'height : 2800px',
			width_positions : [1,4,2,3,1,0,2,2,0,3,1,0],
			height_positions : [
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 0
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete : '59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96']
		};
		views[3] = {
			skill_height : 'height : 3380px',
			width_positions : [1,0,1,1,0,3,1,0,3,1,0,4],
			height_positions : [
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 2
			},
			{
				row : 'block',
				height : 4
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 3
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 2
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete : '59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96']
		};
		views[4] = {
			skill_height : 'height : 3360px',
			width_positions : [1,0,1,0,2,1,0,1,0,4,1,0,2,1,0],
			height_positions : [
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 2
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			},
			{
				row : 'block',
				height : 1
			},
			{
				row : 'inline-block',
				height : -1
			},
			{
				row : 'inline-block',
				height : 1
			}],
			points : '41,0 81,0 112,23 122,61 112,99 81,122 41,122 10,99 0,61 10,23',
			points_complete : '59,0 113,0 156,32 172,84 156,136 113,168 59,168 16,136 0,84 16,32',
			weakest_word_polygon : ['44,118 78,118 84,114 38,114','36,112 86,112 92,108 30,108','28,106 94,106 100,102 22,102','20,100 102,100 108,96 14,96']
		};

		data_views[0] = {
			id : get_ids(each_island_skill[0]),
			weakest_word : get_weakest_words(each_island_skill[0]),
			lesson : get_lessons(each_island_skill[0]),
			lesson_finish : get_lesson_finishs(each_island_skill[0]),
			section : get_sections(each_island_skill[0]),
			unlocked : get_unlockeds(each_island_skill[0]),
			color_skill : get_color_skills(each_island_skill[0]),
			check_point : 4
		};
		data_views[1] = {
			id : get_ids(each_island_skill[1]),
			weakest_word : get_weakest_words(each_island_skill[1]),
			lesson : get_lessons(each_island_skill[1]),
			lesson_finish : get_lesson_finishs(each_island_skill[1]),
			section : get_sections(each_island_skill[1]),
			unlocked : get_unlockeds(each_island_skill[1]),
			color_skill : get_color_skills(each_island_skill[1]),
			check_point : 9
		};
		data_views[2] = {
			id : get_ids(each_island_skill[2]),
			weakest_word : get_weakest_words(each_island_skill[2]),
			lesson : get_lessons(each_island_skill[2]),
			lesson_finish : get_lesson_finishs(each_island_skill[2]),
			section : get_sections(each_island_skill[2]),
			unlocked : get_unlockeds(each_island_skill[2]),
			color_skill : get_color_skills(each_island_skill[2]),
			check_point : 17
		};
		data_views[3] = {
			id : get_ids(each_island_skill[3]),
			weakest_word : get_weakest_words(each_island_skill[3]),
			lesson : get_lessons(each_island_skill[3]),
			lesson_finish : get_lesson_finishs(each_island_skill[3]),
			section : get_sections(each_island_skill[3]),
			unlocked : get_unlockeds(each_island_skill[3]),
			color_skill : get_color_skills(each_island_skill[3]),
			check_point : 25
		};
		data_views[4] = {
			id : get_ids(each_island_skill[4]),
			weakest_word : get_weakest_words(each_island_skill[4]),
			lesson : get_lessons(each_island_skill[4]),
			lesson_finish : get_lesson_finishs(each_island_skill[4]),
			section : get_sections(each_island_skill[4]),
			unlocked : get_unlockeds(each_island_skill[4]),
			color_skill : get_color_skills(each_island_skill[4]),
			check_point : 32
		};

		line_views[0] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,990 90,1170 90,1260 90,1350 270,1530 270,1620',
			points_line : get_points_lines(get_points_skill_types(each_point_element[0] , each_island_skill[0]),0),
			height : '1620',
			points_skill_x : [3,4,3,3,1],
			points_skill_y : [1,4,8,11,14],
			points_skill_type : get_points_skill_types(each_point_element[0], each_island_skill[0])
		};
		line_views[1] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 90,585 90,720 90,990 180,1080 270,1170 270,1260 270,1440',
			points_line : get_points_lines(get_points_skill_types(each_point_element[1] , each_island_skill[1]),1),
			height : '1440',
			points_skill_x : [3,4,1,2,3],
			points_skill_y : [1,4,8,12,14],
			points_skill_type : get_points_skill_types(each_point_element[1], each_island_skill[1])
		};
		line_views[2] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,1080 180,1170 90,1260 90,1530 180,1620 270,1710 270,1890 270,2160 270,2340',
			points_line : get_points_lines(get_points_skill_types(each_point_element[2] , each_island_skill[2]),2),
			height : '2340',
			points_skill_x : [3,4,3,3,2,2,3,3],
			points_skill_y : [1,4,8,11,13,18,21,24],
			points_skill_type : get_points_skill_types(each_point_element[2], each_island_skill[2])
		};
		line_views[3] = {
			points_line_complete : '270,90 270,180 90,360 90,450 90,540 270,720 450,900 450,990, 450,1260 450,1350 270,1530 90,1530 90,1710 90,1980 270,1980 270,2070 450,2250 450,2340 450,2430 270,2610 270,2790',
			points_line : get_points_lines(get_points_skill_types(each_point_element[3] , each_island_skill[3]),3),
			height : '2790',
			points_skill_x : [3,1,3,5,5,1,3,5,3],
			points_skill_y : [1,5,8,11,14,19,22,26,29],
			points_skill_type : get_points_skill_types(each_point_element[3], each_island_skill[3])
		};
		line_views[4] = {
			points_line_complete : '270,90 270,180 90,360 90,450 90,720 270,900 270,1125 450,1125, 450,1260 450,1350 360,1440 270,1530 90,1530 90,1800 90,2070 270,2250 270,2520',
			points_line : get_points_lines(get_points_skill_types(each_point_element[4] , each_island_skill[4]),4),
			height : '2520',
			points_skill_x : [3,1,3,5,4,1,3],
			points_skill_y : [1,5,10,14,16,20,25],
			points_skill_type : get_points_skill_types(each_point_element[4], each_island_skill[4])
		};

		islands_data = {
			skill_total : island_skill_number,
			skill_finish_each_island : get_skill_finish_each_islands(),
			skill_unlocked_each_island : get_skill_unlocked_each_islands()
		};

		$scope.islandBuilder = {
			skills : {
				view : views,
				data_view : data_views
			},
			line : line_views,
			island_data : islands_data
		}
	}

	function islandRightCtrl ($scope, BannerServices, MemoTracker){
		BannerServices.getBanner().success(function (data){
			$scope.banner = data;
			MemoTracker.track('test');
		})
	}

	angular.module('island.controllers', [])
    .controller('IslandMainCtrol', ['$scope','$route', '$routeParams', '$location', 'Skill', 'Plaza', IslandMainCtrol
    ])
    .controller('islandRightCtrl', ['$scope', 'BannerServices', 'MemoTracking', islandRightCtrl]);

}(window.angular));