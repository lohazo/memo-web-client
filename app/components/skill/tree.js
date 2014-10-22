'use strict';

angular.module('skill.tree', [])
    .factory('TreeBuilder', ['$localStorage', function($localStorage) {
	var TreeBuilder = function() {};

	TreeBuilder.prototype.getCheckpoints = function() {
	    TreeBuilder.checkpoints = $localStorage.auth.checkpoints;
	    return TreeBuilder;
	};

	TreeBuilder.prototype.getSkills = function() {
	    TreeBuilder.skills = $localStorage.auth.skills;
	    return TreeBuilder;
	};

	TreeBuilder.prototype.getTree = function() {
	    TreeBuilder.skills_tree = $localStorage.auth.skills_tree;
	    return TreeBuilder;
	};

	TreeBuilder.prototype.build = function() {
	    var checkpoints = TreeBuilder.checkpoints;
	    var tree = TreeBuilder.skills_tree;
	    var skillTree = [];
	    var rowShift = 1;
	    tree.forEach(function(row, i) {
		var skillRow = [];
		if (row !== "null") {
		    var isFirstInRow = true;
		    row.forEach(function(cell, j) {
			if (cell !== "null") {
			    var skill = TreeBuilder.skills.filter(function(sk) {
				return sk._id === cell;
			    })[0];
			    if (isFirstInRow) {
				skill.isFirstInRow = isFirstInRow;
				isFirstInRow = false;
			    }
			    skillRow.push(skill);
			} else {
			    skillRow.push("null");
			}
		    });
		} else {
		    var thisRow = checkpoints.filter(function(checkpoint) {
			return checkpoint.row == (i - rowShift);
		    })[0];
		    rowShift += 1;
		    skillRow.push(thisRow);
		    skillRow.isCheckpoint = true;
		}
		skillTree.push(skillRow);
	    });
	    return skillTree;
	};

	return new TreeBuilder();
    }])
    .directive('skillTree', function() {
	return {
	    strict: 'EA',
	    scope: true,
	    controller: ['$scope', 'TreeBuilder', function($scope, TreeBuilder) {
		TreeBuilder.getCheckpoints();
		TreeBuilder.getSkills();
		TreeBuilder.getTree();
		$scope.skillTree = TreeBuilder.build();
	    }],
	    templateUrl: 'skill/_skill-tree.html'
	};
    });
    // .directive('skillRow', function() {
    //	return {
    //	    strict: 'EA',
    //	    scope: true,
    //	    template: '<div class="skill-row"></div>'
    //	};
    // })
    // .directive('skillCell', function() {
    //	return {
    //	    strict: 'EA',
    //	    scope: true,
    //	    templateUrl: 'skill/_skill-cell.html'
    //	};
    // })
    // .directive('skillCheckpoint', function() {
    //	return {
    //	    strict: 'EA',
    //	    scope: true,
    //	    templateUrl: 'skill/_skill-checkpoint.html'
    //	};
    // });