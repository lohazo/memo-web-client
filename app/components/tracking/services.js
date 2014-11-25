'use strict';

angular.module('tracking.services', [])
   .factory('Mixpanel', function() {
    var Mixpanel = {};
    Mixpanel.trackSignup = function(data) {
        var user = data;
        mixpanel.alias(user.id);
        mixpanel.people.set(data);
        mixpanel.track('Web 1.0.2 signup');
    };

    Mixpanel.trackSignin = function(data) {
        mixpanel.identify(data.id);
        mixpanel.people.set(data);
        mixpanel.track('Web 1.0.2 signin');
    };

    Mixpanel.track = function(eventName, data) {
        eventName = "Web 1.0.2 " + eventName;
        mixpanel.track(eventName, data);
    };

    Mixpanel.register = function(data) {
        // Register wrapper
        mixpanel.register(data);
    };
    return Mixpanel;
});
