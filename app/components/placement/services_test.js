'use strict';

describe('service', function() {

    // load modules
    beforeEach(module('placement.services'));

    describe('Placement', function() {
	var PlacementTest, rootScope;

	beforeEach(inject(function($rootScope, Placement) {
	    rootScope = $rootScope;
	    PlacementTest = Placement;
	}));


	it('check if PlacementTest exists', function() {
	    expect(PlacementTest).toBeDefined();
	});
    });
});
