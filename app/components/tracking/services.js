'use strict';

(function(angular, localStorage) {
  function EcoTracking($http, $q, $routeParams, $cookies, $localStorage) {
    var BASE_URL = 'http://eco-tracking.memo.edu.vn';
    var tracker = {};
    var isCalled = 0;

    tracker.init = function() {
      if (isCalled < 1) {
        tracker.createFrame();

        if (!$localStorage.eco_user) {
          tracker.getTrackingCookie();
        } else {
          tracker.track('Enter page', {});
        }

        isCalled += 1;
      }
    };

    tracker.createFrame = function() {
      var ifrm = document.createElement('iframe');
      ifrm.setAttribute('src', BASE_URL + '/tracking_frame/index');
      ifrm.setAttribute('style', 'display:none;width:0px;height:0px;');
      document.body.appendChild(ifrm);
      return ifrm;
    };

    tracker.getTrackingCookie = function() {
      window.addEventListener('message', function(msg) {
        if (msg.origin !== BASE_URL) return;

        $cookies.eco_uuid = msg.data;
        var data = {
          cookie: $cookies.eco_uuid
        };

        tracker.getUserId(data);
      }, false);
    };

    tracker.getUserId = function(data, callback) {
      data.name = "Enter page";
      data.browsing_domain = document.URL;
      data.referrer_url = document.referrer_url;

      return $http.post(BASE_URL + '/users/track', data)
      .success(function(response) {
        localStorage.eco_user = JSON.stringify(response);
        if (callback instanceof Function) callback(response);
      })
      .error(function(response) {
      });
    };

    tracker.track = function(eventName, data, callback) {
      // data = {name: eventName, cookie: eco_uuid}
      var user = JSON.parse(localStorage.eco_user);

      var requestData = {
        name: eventName,
        cookie: $cookies.eco_uuid,
        user_id: user.user_id,
        browsing_domain: document.URL,
        referrer_url: document.referrer,
        submitted_form_data: JSON.stringify(data)
      };

      $http.post(BASE_URL + '/users/track', requestData)
      .success(function(response) {
        $cookies.eco_uuid = response;
        if (callback instanceof Function) callback(response);
      })
      .error(function() {
      });
    };

    return tracker;
  }

  function MixpanelFactory() {
    var Mixpanel = {};

    Mixpanel.trackSignin = function(data) {
      mixpanel.identify(data.id);
      mixpanel.people.set(data);
      mixpanel.track('Web 1.0.2 signin');
    };

    Mixpanel.track = function(eventName, data) {
      eventName = "Web 1.0.2 " + eventName;
      mixpanel.track(eventName, data);
    };

    Mixpanel.track = function(eventName, data, callback) {
      eventName = "Web 1.0.2 " + eventName;
      mixpanel.track(eventName, data, callback);
    };

    Mixpanel.register = function(data) {
      // Register wrapper
      mixpanel.register(data);
    };
    return Mixpanel;
  }

  angular.module('tracking.services', ['ngCookies'])
  .factory('EcoTracking', [
    '$http', '$q', '$routeParams', '$cookies', '$localStorage', EcoTracking])
  .factory('Mixpanel', MixpanelFactory);

})(window.angular, window.localStorage);