import $ from "jquery";

export function showTab() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      let panel = $('#panel');
      let publish = $('.show-publish');

      element.on('click', showPublishTab);

      function showPublishTab () {
        panel.toggleClass( "viewCode");
        publish.toggleClass( "md-accent")
          .toggleClass( "md-primary");
      }
    }
  };
}
