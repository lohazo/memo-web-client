'use strict';

angular.module('skill.directives', [])
  .directive('skillCell', function() {
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      template: '<div></div>'
    };
  })
    .directive('grammarCoBan1', function() {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-co-ban-1.html'
      };
    })
    .directive('grammarCoBan2', function() {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-co-ban-2.html'
      };
    })
    .directive('grammarDaiTuKhachQuan', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-khach-quan.html'
      };
    })
    .directive('grammarDaiTuSoHuu', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-so-huu.html'
      };
    })
    .directive('grammarDongTuThiQuaKhuHoanThanh', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-qua-khu-hoan-thanh.html'
      };
    })
    .directive('grammarGioiTu', function(){
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-gioi-tu.html'
      };
    })
    .directive('grammarNhungNhomTuThongDung', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-nhung-nhom-tu-thong-dung.html'
      };
    })
    .directive('grammarSoNhieu', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-so-nhieu.html'
      };
    })
    .directive('grammarTuHanDinh', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-tu-han-dinh.html'
      };
    })
    .directive('grammarDongTuHienTai1', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-hien-tai-1.html'
      };
    })
    .directive('grammarDongTuHienTai2', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-hien-tai-2.html'
      };
    })
    .directive('grammarDongThiQuaKhu', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-qua-khu.html'
      };
    })
    .directive('grammarDongTuQuaKhu2', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-qua-khu-2.html'
      };
    })
    .directive('grammarBienToTinhTu', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-bien-to-tinh-tu.html'
      };
    })
    .directive('grammarDongTuThiHienTaiHoanThanh', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-hien-tai-hoan-thanh.html'
      };
    })
    .directive('grammarDaiTuQuanHe', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-quan-he.html'
      };
    })
    .directive('grammarDaiTuPhanThan', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dai-tu-phan-than.html'
      };
    })
    .directive('grammarDongTuDuoiIng', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-duoi-ing.html'
      };
    })
    .directive('grammarDongTuThiTuongLai', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-tuong-lai.html'
      };
    })
    .directive('grammarDongTuThiTuongLaiDon', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-tuong-lai-don.html'
      };
    })
    .directive('grammarDongTuThiTuongLaiHoanThanh', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-thi-tuong-lai-hoan-thanh.html'
      };
    })
    .directive('grammarDongTuKhiemKhuyet', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dong-tu-khiem-khuyet.html'
      };
    })
    .directive('grammarDieuKienHoanThanh', function(){
      return{
        restrict: 'EA',
        scope: true,
        templateUrl: 'skill/_skill-dieu-kien-hoan-thanh.html'
      };
    })
