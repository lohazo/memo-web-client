'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
    beforeEach(module('myApp.controllers'));

    it('should ....', inject(function($controller) {
        //spec body
        var homeCtrl = $controller('HomeCtrl', { $scope: {} });
        expect(homeCtrl).toBeDefined();
    }));
});
