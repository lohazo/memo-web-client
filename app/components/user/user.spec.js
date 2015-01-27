'use strict';

describe('user', function () {

  beforeEach(module('user'));
  beforeEach(module('ngStorage'));

  describe('UserServices', function () {

    var userServices;

    beforeEach(inject(function (_UserServices_) {
      userServices = _UserServices_;
    }));

    it('should be defined', function () {
      expect(userServices).toBeDefined();
    });

    describe('UserServices.create', function () {
      var httpBackend, $localStorage;

      beforeEach(inject(function ($httpBackend, _$localStorage_) {
        httpBackend = $httpBackend;
        $localStorage = _$localStorage_;

        httpBackend.whenPOST('http://staging.memo.edu.vn/v2/api/users').respond({
          _id: "54c75c626d61690671000000"
          auth_token: "VxWvRW-Y_H7ak7LH"
          current_course_id: null
          email: "nguyenphanhai3@gmail.com"
          fb_Id: null
          fb_email: null
          gmail: null
          is_beginner: false
          is_newly_sign_up: true
          mobile: []
          url_avatar: null
          username: "test202"
        });
      }));

      it('should have defined user-create function', function () {
        expect(userServices.create).toBeDefined();
      });

      it('should have localStorage wrapper inside', function () {

      });
    });
  })
});