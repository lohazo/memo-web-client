'use strict';

describe('Service', function() {
    // load modules
    beforeEach(module('question.services'));

    describe('Question', function() {
	var service, scope;

	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if service exists', function() {
	    expect(service).toBeDefined();
	});
    });

    describe('Question.checkListen', function() {
	var service, scope;
	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if checkListen exists', function() {
	    expect(service.checkListen).toBeDefined();
	});

	it('should return true', function() {
	    var question = {
		question: 'Which secretary?'
	    };
	    var answer = 'Which secretary';
	    expect(service.checkListen(question, answer).result).toBe(true);
	});
    });

    describe('Question.check Translate', function() {
	var service, scope;
	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if check exists', function() {
	    expect(service.check).toBeDefined();
	});
    });

    describe('Question.createHtmlForTypoAnswer', function() {
	var service, scope;
	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if createHtmlForTypoAnswer exists', function() {
	    expect(service.createHtmlForTypoAnswer).toBeDefined();
	});

	it('should have correct format', function() {
	    expect(service.createHtmlForTypoAnswer('He eats', [[1, 4]])).toBe('He <u>eats</u>');
	});
    });

    describe('Question.checkTypoOnString', function() {
	var service, scope;
	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if checkTypoOnString exists', function() {
	    expect(service.checkTypoOnString).toBeDefined();
	});

	it('should return false', function() {
	    expect(service.checkTypoOnString('He is a man', 'He eats an apple')).toBe(false);
	});

	it('should return a formatted array', function() {
	    expect(service.checkTypoOnString('He iss a man', 'He is a man')).toContain([1, 2]);
	    expect(service.checkTypoOnString('He eat an apple', 'He eats an aple')).toContain([1, 4]);
	    expect(service.checkTypoOnString('cau be', 'Cậu bé')).toContain([0, 3]);
	    expect(service.checkTypoOnString('cau be', 'Cậu bé')).toContain([1, 2]);
	    expect(service.checkTypoOnString('Tôi là một nguời đàn ông', 'Tôi là một người đàn ông')).toContain([3, 5]);
	    expect(service.checkTypoOnString('Tôi là một chu bé', 'Tôi là một chú bé.')).toContain([3, 3]);
	});
    });

    describe('Question.checkTypoOnWord', function() {
	var service, scope;

	beforeEach(inject(function($rootScope, Question) {
	    scope = $rootScope.$new();
	    service = Question;
	}));

	it('check if checkTypoOnWord exists', function() {
	    expect(service.checkTypoOnWord).toBeDefined();
	});

	it('should return {isEqual: true} when two words are similar', function() {
	    var word = 'a';
	    expect(service.checkTypoOnWord(word, word).isEqual).toBe(true);
	});

	it('should return {isTypo: true} when two words are diacritically similar', function() {
	    expect(service.checkTypoOnWord('â', 'a').isTypo).toBe(true);
	});

	it('should return {isDifferent: true} when inputWord is blank', function() {
	    expect(service.checkTypoOnWord('', 'a').isDifferent).toBe(true);
	});

	it('should return {isTypo: true}', function() {
	    expect(service.checkTypoOnWord('eat', 'eats').isTypo).toBe(true);
	    expect(service.checkTypoOnWord('hour', 'hours').isTypo).toBe(true);
	    expect(service.checkTypoOnWord('hours', 'hour').isTypo).toBe(true);
	});

	it('should return {isDifferent: true}', function() {
	    expect(service.checkTypoOnWord('fundamental', 'fandemetel').isDifferent).toBe(true);
	    expect(service.checkTypoOnWord('fundamental', 'fandemetal').isDifferent).toBe(true);
	    expect(service.checkTypoOnWord('fundamental', 'fandametal').isDifferent).toBe(true);
	    expect(service.checkTypoOnWord('enter', 'antor').isDifferent).toBe(true);
	    expect(service.checkTypoOnWord('milestone', 'mylestane').isDifferent).toBe(true);
	});
    });
});
