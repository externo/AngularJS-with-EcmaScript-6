import $ from "jquery";

export function scroll() {

  let header = $('[md-page-header]');
  let baseDimensions = header[0].getBoundingClientRect();
  let title = angular.element($('[md-header-title]'));
  let picture = angular.element($('[md-header-picture]'));
  let fab = angular.element($('.main-fab'));
  let legacyToolbarH = 64;
  let legacyFabMid = 56 / 2;
  let titleZoom = 1.5;
  let primaryColor = [69,90,100];

  return {
    restrict: 'A',
    link: function (scope, element, attrs, $window) {
      styleInit();
      handleStyle(baseDimensions);

      /* Scroll event listener */
      angular.element($window).bind("scroll", function () {
        let dimensions = header[0].getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

      /* Resize event listener */
      angular.element($window).bind('resize', function () {
        baseDimensions = header[0].getBoundingClientRect();
        let dimensions = header[0].getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

      function handleStyle(dim) {
        fab.css('top', (dim.height - legacyFabMid) + 'px');
        if ((dim.bottom - baseDimensions.top) > legacyToolbarH) {
          title.css('top', ((dim.bottom - baseDimensions.top) - legacyToolbarH) + 'px');
          element.css('height', (dim.bottom - baseDimensions.top) + 'px');
          title.css('transform', 'scale(' + ((titleZoom - 1) * ratio(dim) + 1) + ',' + ((titleZoom - 1) * ratio(dim) + 1) + ')');
          element.css('background-color','rgba('+primaryColor[0]+','+primaryColor[1]+','+primaryColor[2]+','+(1-ratio(dim))+')');
        } else {
          title.css('top', '0px');
          element.css('height', legacyToolbarH + 'px');
          title.css('transform', 'scale(1,1)');
        }
        if ((dim.bottom - baseDimensions.top) < legacyToolbarH * 2 && !fab.hasClass('hide')) {
          fab.addClass('hide');
        }
        if ((dim.bottom - baseDimensions.top) > legacyToolbarH * 2 && fab.hasClass('hide')) {
          fab.removeClass('hide');
        }
        element.css('background-color', 'rgba(' + primaryColor[0] + ',' + primaryColor[1] + ',' + primaryColor[2] + ',' + (1 - ratio(dim)) + ')');
        picture.css('background-position', '50% ' + (ratio(dim) * 50) + '%');
      }

      function styleInit() {
        title.css('padding-left', '16px');
        title.css('position', 'relative');
        title.css('transform-origin', '24px');
      }

      function ratio(dim) {
        let r = (dim.bottom - baseDimensions.top) / dim.height;
        if (r < 0) return 0;
        if (r > 1) return 1;
        return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
      }

    }
  };
}