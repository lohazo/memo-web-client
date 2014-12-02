'use strict';

angular.module('app.services', [])
.factory('HttpInterceptor', function($rootScope, $q, $window, $localStorage) {
    return {
        // optional method
        'request': function(config) {
        // do something on success
        return config;
    },

        // optional method
        'requestError': function(rejection) {
        // do something on error

        // if (canRecover(rejection)) {
        //     return responseOrNewPromise
        // }
        return $q.reject(rejection);
    },

        // optional method
        'response': function(response) {
        // do something on success
        if (response.status === 401) {
            $localStorage.$reset();
            alert(response.data.error);
            $window.reload();
        }
        return response;
    },

        // optional method
        'responseError': function(rejection) {
        // do something on error
        if (rejection.status === 401) {
            $localStorage.$reset();
            alert(rejection.data.error);
            $window.location = '/';
        }
        return $q.reject(rejection);
    }
};
})
.factory('AppSetting', [
    'AppServices', '$localStorage',
    function(AppServices, $localStorage) {
        var Setting = {};
        Setting.get = function() {
            return AppServices.get().then(function(response) {
                $localStorage.appSetting = response.data;
            });
        };
        return Setting;
    }
    ])

.factory('AppServices', [
    '$http', '$q', '$localStorage',
    function($http, $q, $localStorage) {
        var HOST = 'http://api.memo.edu.vn/api',
        API_VERSION = '/v1.4',
        BASE_URL = HOST + API_VERSION;

        var AppServices = {};
        AppServices.get = function(data) {
            var deferred = $q.defer();
            var authToken = $localStorage.auth.user.auth_token;

            $http.get(BASE_URL + '/appsettings?auth_token=' + authToken + '&device=web')
            .then(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        return AppServices;
    }
    ])

.factory('MessageList', [
    'GetListMessage', '$localStorage', 
    function(GetListMessage, $localStorage){
        var Message = {};
        Message.get = function(){
            return GetListMessage.get().then(function(response){
                $localStorage.getListMessage = response.data;
            });
        };
        return Message;
    }])

.factory('GetListMessage', ['$http', '$q', '$localStorage' ,
    function($http, $q, $localStorage){
        var HOST = 'http://services.memo.edu.vn/api',
        API_VERSION =  '',
        BASE_URL = HOST + API_VERSION;
        
        var GetListMessage = {};
        GetListMessage.get = function(data){
            var deferred = $q.defer();
            var authToken = $localStorage.auth.user.auth_token;
            $http.get(BASE_URL + '/messages?auth_token=' + authToken)
            .then(function(response){
                deferred.resolve(response); 
            });
            return deferred.promise;
        };
        return GetListMessage;
    }])

.factory('OpenMessage', [
    'GetOpenMessage', '$localStorage', 
    function(GetOpenMessage, $localStorage){
        var openMessage = {};
        openMessage.get = function(){
            return GetOpenMessage.get().then(function(response){
                $localStorage.getOpenMessage = response.data;
            });
        };
        return openMessage;
    }])
.factory('GetOpenMessage', ['$http', '$q', '$localStorage' ,
    function($http, $q, $localStorage){
        var HOST = 'http://services.memo.edu.vn/api',
        API_VERSION =  '',
        BASE_URL = HOST + API_VERSION;
        
        var GetOpenMessage = {};
        GetOpenMessage.get = function(data){
            var deferred = $q.defer();
            var authToken = $localStorage.auth.user.auth_token;
            $http.post(BASE_URL + '/messages/open_messages',{message_ids:'["547bec7d64656267a52c0100", "abc"]',auth_token:authToken})
            .then(function(response){
                deferred.resolve(response); 
            });
            return deferred.promise;
        };
        return GetOpenMessage;
    }]);
