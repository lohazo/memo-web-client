(function (angular) {
  'use strict';

  function GoogleAds() {
    return {
      restrict: 'A',
      template: [
        '<ins class="adsbygoogle"></ins>'
      ].join(''),
      link: function ($scope, $element, $attrs) {
        var style = {
          display: 'inline-block',
          width: $attrs.googleAdsWidth,
          height: $attrs.googleAdsHeight
        };
        $element.find('ins').eq(0).css(style);
        $element.find('ins').eq(0).attr({
          'data-ad-client': $attrs.googleAdsClient,
          'data-ad-slot': $attrs.googleAdsSlot
        });
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    };
  }

  angular.module('adsense', [])
    .directive('googleAds', GoogleAds);
}(window.angular));