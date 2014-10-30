'use strict';

angular.module('skill.services', [])
    .factory('Skill', [
	'$localStorage',
	function($localStorage) {
	    function getSkills() {
		return $localStorage.auth.skills;
	    }

	    function getSkill(skillId) {
		return $localStorage.auth.skills.filter(function(skill) {
		    return skill._id === skillId;
		})[0];
	    }

	    return {
		skills: getSkills,
		skill: getSkill
	    };
	}
    ]);
