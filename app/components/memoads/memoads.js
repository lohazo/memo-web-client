(function (angular) {
  'use strict';

  function GoogleAds() {
    return {
      restrict: 'A',
      // link: function ($scope, $element, $attrs) {
      //   var script = document.createElement('script');
      //   script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      //   $element.append(script);

      //   $element.append('<ins class="adsbygoogle"></ins>');

      //   var style = {
      //     display: 'inline-block',
      //     width: $attrs.googleAdsWidth,
      //     height: $attrs.googleAdsHeight
      //   };
      //   $element.find('ins').eq(0).css(style);
      //   $element.find('ins').eq(0).attr({
      //     'data-ad-client': $attrs.googleAdsClient,
      //     'data-ad-slot': $attrs.googleAdsSlot
      //   });

      //   script = document.createElement('script');
      //   script.text = '(adsbygoogle = window.adsbygoogle || []).push({});'
      //   $element.append(script);
      // }
    };
  }

  angular.module('adsense', [])
    .directive('googleAds', [GoogleAds]);
}(window.angular));