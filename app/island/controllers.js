(function (angular) {

	'use strict';
	function IslandMainCtrol($scope, $route, $routeParams, $location, Skill){
		$scope.skills = Skill.skills();		
		$scope.check_weakestWord = 'show';
		console.log(Skill.skills());
		$scope.param = $routeParams;
		var views=[],data_views = [],line_views = [],islands_data;
		var each_point_element = [[1,2,2,1,2],[1,2,2,1,2],[1,2,1,2,1,2,1,2],[2,1,0,2,1,2,1,2,1],[2,2,3,2,1,2,3]];
		var each_island_skill = [[0,7],[8,15],[16,27],[28,39],[40,54]];
		var island_skill_number = [8,8,12,12,15];

		$scope.conver_int_ten = function(number){
			return parseInt(number/11);
		}
		
		$scope.conver_surplus_ten = function(number){
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
				data_sections.push($scope.skills[i].title);
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
		// ket thuc du lieu phan data_view

		// du lieu phan island_data
		
		

		// du lieu phan duong
		function get_points_skill_types(){
			for (var i = 0 ; i < each_point_element.length; i++){
				for (var j = 0; j < each_point_element[i].length; j++){
					
				}
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
			id : ['en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1','en-vi_co_ban_1'],
			weakest_word : [1,2,3,4,0,0,0,0],
			lesson : [3,3,3,3,4,5,6,7],
			lesson_finish : [3,3,3,3,2,0,0,0],
			section : ['cơ bản 1','cơ bản 2','cơ bản 3','cơ bản','cơ bản','cơ bản','cơ bản','cơ bản'],
			unlocked : [true,true,true,true,true,false,false,false],
			color_skill : ['#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4']
		};
		data_views[1] = {
			id : ['en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao','en-vi_quan_ao'],
			weakest_word : [1,2,3,4,0,0,0,0],
			lesson : [3,3,3,3,4,5,6,7],
			lesson_finish : [3,3,3,3,2,0,0,0],
			section : ['cơ bản 21','cơ bản 22','cơ bản 23','cơ bản 2','cơ bản 2','cơ bản 2','cơ bản 2','cơ bản 2'],
			unlocked : [true,true,true,true,true,false,false,false],
			color_skill : ['#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4']
		};
		data_views[2] = {
			id : ['en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep','en-vi_nghe_nghiep'],
			weakest_word : [1,2,2,3,4,0,0,0,0,0,0,0],
			lesson : [3,3,3,3,4,5,6,7,2,4,5,6],
			lesson_finish : [3,3,3,3,4,2,0,0,0,0,0,0],
			section : ['cơ bản 31','cơ bản 32','cơ bản 33','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3','cơ bản 3'],
			unlocked : [true,true,true,true,true,true,false,false,false,false,false,false],
			color_skill : ['#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00']
		};
		data_views[3] = {
			id : ['en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu','en-vi_dong_tu_thi_qua_khu'],
			weakest_word : [1,2,2,3,4,0,0,0,0,0,0,0],
			lesson : [3,3,3,3,4,5,6,7,2,4,5,6],
			lesson_finish : [3,3,3,3,4,2,0,0,0,0,0,0],
			section : ['cơ bản 41','cơ bản 42','cơ bản 43','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4','cơ bản 4'],
			unlocked : [true,true,true,true,true,true,false,false,false,false,false,false],
			color_skill : ['#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00']
		};
		data_views[4] = {
			id : ['en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds','en-vi_danh_dong_tu_gerunds'],
			weakest_word : [1,2,2,3,4,4,4,0,0,0,0,0,0,0,0],
			lesson : [3,3,3,3,4,5,6,7,2,4,5,6,1,2,8],
			lesson_finish : [3,3,3,3,4,5,6,3,0,0,0,0,0,0,0],
			section : ['cơ bản 51','cơ bản 52','cơ bản 53','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5','cơ bản 5'],
			unlocked : [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
			color_skill : ['#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00','#ff4444','#33b5e4','#99cc00']
		};

		line_views[0] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,990 90,1170 90,1260 90,1350 270,1530 270,1620',
			points_line : '270,720 270,990 90,1170 90,1260 90,1350 270,1530 270,1620',
			height : '1620',
			points_skill_x : [3,4,3,3,1],
			points_skill_y : [1,4,8,11,14],
			points_skill_type : [1,1,0,-1,-1]
		};
		line_views[1] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 90,585 90,720 90,990 180,1080 270,1170 270,1260 270,1440',
			points_line : '90,720 90,990 180,1080 270,1170 270,1260 270,1440',
			height : '1440',
			points_skill_x : [3,4,1,2,3],
			points_skill_y : [1,4,8,12,14],
			points_skill_type : [1,1,0,-1,-1]
		};
		line_views[2] = {
			points_line_complete : '270,90 270,270 360,360 450,450 450,585 270,585 270,720 270,1080 180,1170 90,1260 90,1530 180,1620 270,1710 270,1890 270,2160 270,2340',
			points_line : '270,990 270,1080 180,1170 90,1260 90,1530 180,1620 270,1710 270,1890 270,2160 270,2340',
			height : '2340',
			points_skill_x : [3,4,3,3,2,2,3,3],
			points_skill_y : [1,4,8,11,13,18,21,24],
			points_skill_type : [1,1,1,0,-1,-1,-1,-1]
		};
		line_views[3] = {
			points_line_complete : '270,90 270,180 90,360 90,450 90,540 270,720 450,900 450,990, 450,1260 450,1350 270,1530 90,1530 90,1710 90,1980 270,1980 270,2070 450,2250 450,2340 450,2430 270,2610 270,2790',
			points_line : '450,1260 450,1350 270,1530 90,1530 90,1710 90,1980 270,1980 270,2070 450,2250 450,2340 450,2430 270,2610 270,2790',
			height : '2790',
			points_skill_x : [3,1,3,5,5,1,3,5,3],
			points_skill_y : [1,5,8,11,14,19,22,26,29],
			points_skill_type : [1,1,1,1,0,-1,-1,-1,-1]
		};
		line_views[4] = {
			points_line_complete : '270,90 270,180 90,360 90,450 90,720 270,900 270,1125 450,1125, 450,1260 450,1350 360,1440 270,1530 90,1530 90,1800 90,2070 270,2250 270,2520',
			points_line : '450,1260 450,1350 360,1440 270,1530 90,1530 90,1800 90,2070 270,2250 270,2520',
			height : '2520',
			points_skill_x : [3,1,3,5,4,1,3],
			points_skill_y : [1,5,10,14,16,20,25],
			points_skill_type : [1,1,1,0,-1,-1,-1]
		};

		islands_data = {
			skill_total : island_skill_number,
			skill_finish_each_island : [8,8,4,0,0],
			skill_unlocked_each_island : [8,8,6,0,0]
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

	angular.module('island.controllers', [])
    .controller('IslandMainCtrol', ['$scope','$route', '$routeParams', '$location', 'Skill', IslandMainCtrol
    ]);

}(window.angular));