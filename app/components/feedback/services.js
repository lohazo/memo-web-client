'use strict';

angular.module('feedback.services', [])
    .factory('Feedback', ['FeedbackServices', function(FeedbackServices) {
	var Feedback = {};

	/* A feedback is like {
		    question_log_id: $scope.question.question_log_id,
		    user_answer: $scope.question.userAnswer || '',
		    user_note: userNote,
		    feedback_type_ids: feedbackTypeIds,
		    auto_feedback: false
		} */
	Feedback.list = [];

	Feedback.create = function() {
	    var data = {
		feedbacks: JSON.stringify(Feedback.list)
	    };
	    return FeedbackServices.create(data);
	};

	return Feedback;
    }])
    .factory('FeedbackServices', [
	'$http', '$q', '$localStorage',
	function($http, $q, $localStorage) {
	    var HOST = "http://api.memo.edu.vn/api",
		API_VERSION = "/v1.5",
		BASE_URL = HOST + API_VERSION;

	    var Feedback = {};

	    Feedback.create = function(data) {
		var auth_token = $localStorage.auth.user.auth_token;
		data.auth_token = auth_token;
		// data = {auth_token, feedbacks: [{
		// "question_log_id":"544f488248177e4c0c8b456f",
		// "user_input":"Test thoi nhe!",
		// "is_auto":true}]}
		var deferred = $q.defer();

		$http.post(BASE_URL + '/feedback/create', data)
		    .then(function(response) {
			deferred.resolve(response);
		    });

		return deferred.promise;
	    };

	    return Feedback;
	}
    ]);
