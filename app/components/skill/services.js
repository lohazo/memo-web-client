'use strict';

angular.module('skill.services', [])
    .factory('Skill', [
	'$localStorage', 'Mixpanel',
	function($localStorage, Mixpanel) {
	    var Skill = {};

	    Skill.skills = function() {
		Mixpanel.track('screen SkillList');
		return $localStorage.auth.skills;
	    };

	    Skill.skill = function(skillId) {
		Mixpanel.track('screen HexagonLessonList');
		return $localStorage.auth.skills.filter(function(skill) {
		    return skill._id === skillId;
		})[0];
	    };

	    return Skill;
	}
    ]);
