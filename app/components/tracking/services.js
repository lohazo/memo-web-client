'use strict';

angular.module('tracking.services', [])
    .factory('Mixpanel', ['$http', '$q', function() {
	var Mixpanel = function() {};

	Mixpanel.prototype.trackSignup = function(data) {
	    var user = data;
	    mixpanel.alias(user.id);
	    mixpanel.people.set(data);
	    mixpanel.track('Web Signup');
	};

	Mixpanel.prototype.trackSignin = function(data) {
	    mixpanel.identify(data.id);
	    mixpanel.people.set(data);
	    mixpanel.track('Web Signin');
	};

	Mixpanel.prototype.track = function(eventName, data) {
	    mixpanel.track(eventName, data);
	};

	Mixpanel.prototype.register = function(data) {
	    // Register wrapper
	    mixpanel.register(data);
	};

	return new Mixpanel();
    }]);
