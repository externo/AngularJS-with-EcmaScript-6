import $ from "jquery";
import $mdDialog from "angular-material";
import alertify from 'alertify.js';

const INIT = new WeakMap();
const SERVICE = new WeakMap();

let dialogSvc;
let partUrl;
let partHeaders;

export class HomeController {

  // @ngInject
  constructor(Ads, REST_URL, REST_HEADERS, $mdDialog) {
    partUrl = REST_URL + 'Part/';
    partHeaders = REST_HEADERS;

    SERVICE.set(this, Ads);

    dialogSvc = $mdDialog;

    INIT.set(this, () => {
      SERVICE.get(this)
        .getCategories()
        .then(ads => {
          this.categories = ads.data.results;
        });
      SERVICE.get(this)
        .getAds()
        .then(ads => {
          this.ads = ads.data.results;
          alertify.log(`Обявите са заредени.`);
        });
    });

    INIT.get(this)();
  }

  showAdDialog(ev, ad) {
    
    let template =
      `<md-dialog>

        <md-toolbar>
          <div class="md-toolbar-tools">
          <h2> ${ad.description.name} + </h2>
          <span flex></span>
          <md-button class="md-icon-button" ng-click="cancel()">
            <md-icon md-svg-src="assets/images/icons/close.svg" aria-label="Затвори"></md-icon>
          </md-button>
          </div>
        </md-toolbar>

        <md-dialog-content>
          <md-tabs md-dynamic-width md-dynamic-height md-border-bottom>
            <md-tab label="Снимка 1">
              <img class="shelf-img" ng-src="${ad.img1.url}" />
            </md-tab>
            <md-tab label="Снимка 2">
              <img class="shelf-img" ng-src="${ad.img1.url}" />
            </md-tab>
          </md-tabs>
        </md-dialog-content>

        <md-dialog-actions layout="row">
          <md-button class=""> ${ad.description.text} + </md-button>
            <span flex></span>
          <md-button class="md-raised"> ${ad.description.price} + </md-button>
        </md-dialog-actions>

      </md-dialog>`;

    ShowDialog(ev, template);
  };
}

function ShowDialog(ev, template){
  dialogSvc.show({
    controller: DialogController,
    template: template,
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose: true
  });
}

// @ngInject
function DialogController($scope) {
  $scope.hide = function() {
    dialogSvc.hide();
  };
  $scope.cancel = function() {
    dialogSvc.cancel();
  };
  $scope.answer = function(answer) {
    dialogSvc.hide(answer);
  };
}
