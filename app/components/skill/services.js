'use strict';

angular.module('skill.services', [])
    .factory('Skill', [])
    .factory('SkillServices', [
	'$http',
	'$q',
	function($http, $q) {
	    var HOST = "http://api.memo.edu.vn/api",
		API_VERSION = "/v1.2",
		BASE_URL = HOST + API_VERSION;

	    return {
		
	    };
	}
    ]);
