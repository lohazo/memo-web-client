'use strict';

angular.module('skill.services', [])
.factory('Skill', [
	'$localStorage', 'Mixpanel', 'MemoTracking',
	function($localStorage, Mixpanel, MemoTracker) {
		var Skill = {};
		
		Skill.skills = function() {
			mixpanel.track('Web 1.0.2 skills list');
			MemoTracker.track('start exam lesson');
			return $localStorage.auth.skills;
		};
		Skill.skill = function(skillId) {
			mixpanel.track('Web 1.0.2 lesson list');
			return $localStorage.auth.skills.filter(function(skill) {
				return skill._id === skillId;
			})[0];
		};
		return Skill;
	}
	]);

