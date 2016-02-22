import $ from "jquery";
import alertify from 'alertify.js';

const HTTP = new WeakMap();
const INIT = new WeakMap();
const SERVICE = new WeakMap();
let partUrl;
let fileUrl;
let partHeaders;
let imgHeaders;
let editedAd;
let clickedAdDiv;
let imageData;
let authService;

export class AdminController {

  // @ngInject
  constructor(Ads, Auth, $http, REST_URL, REST_HEADERS, IMG_URL, IMG_HEADERS) {
    this.adData = {description: {}};
    authService = Auth;
    partUrl = REST_URL + 'Part/';
    partHeaders = REST_HEADERS;
    fileUrl = IMG_URL;
    imgHeaders = IMG_HEADERS;

    HTTP.set(this, $http);

    SERVICE.set(this, Ads);

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
        });
    });

    INIT.get(this)();
  }

  logout(){
    authService.logout();
  }

  imageAd(fileInputField) {
    let file = fileInputField.files[0];
    let imgUrl = fileUrl + file.name;

    HTTP.get(this)
      .post(imgUrl, file, imgHeaders)
      .success(function (imgData) {
        imgData.__type = 'File';
        imageData = imgData;
        console.log(`Снимката ${file.name} е добавена.`);
      })
      .error(function (err) {
        console.log(`Грешка: ${err} при добавянето на снимката.`);
      });
  }

  publishAd(adData) {
    adData.img1 = imageData;
    HTTP.get(this)
      .post(partUrl, adData, partHeaders)
      .success(function (data) {
        alertify.logPosition("top right").success(`Обявата за е добавена.`);
        //add(adData);
      })
      .error(function (err) {
        alertify.error(`Неуспешен опит да добавите нова обява!` + err);
      });
  }

  getAd(ad) {
    let idSelector = '#' + ad.objectId;
    clickedAdDiv = $(idSelector);

    editedAd = ad;

    openAdAction();

    function openAdAction() {
      // differentiate [click ad buttons toolbar] from [click ad-div]
      clickedAdDiv.click(function (e) {
        e.stopPropagation();
      });
      clickedAdDiv.find(".close").click(function (e) {
        e.stopPropagation();
      });

      // blur header and other ads
      $('[md-page-header]').addClass('blur');
      $('md-list-item')
        .addClass('blur')
        .removeClass('clicked')
        .addClass('notClicked');

      // de-blur clicked ad
      clickedAdDiv
        .removeClass('blur')
        .removeClass('notClicked')
        .addClass('clicked');

      // close/open buttons toolbar
      $("input").prop('checked', false);
      clickedAdDiv.find("input").prop('checked', true);
    }
  }

  editAd() {
    editedAd.img1 = imageData;
    let adUrl = partUrl + editedAd.objectId;

    HTTP.get(this)
      .put(adUrl, editedAd, partHeaders)
      .success(function (data) {
        alertify.logPosition("top right").success(`Обявата за ${data.description.name} е редактирана.`);
        close();
      })
      .error(function (err) {
        alertify.error(`Неуспешен опит да редактирате обявата!` + err);
      });
  }

  closeAd() {
    close();
  }

  deleteAd(ad) { // TODO: does not work on multiply ads
    let adUrl = partUrl + ad.objectId;
    let deletedAd = $('#' + ad.objectId);
    let name = ad.description.name;

    HTTP.get(this)
      .delete(adUrl, partHeaders)
      .success(function () {
        deletedAd.hide();
        alertify.logPosition("top right").success(`Обявата ${name} е изтрита.`);
        close();
      })
      .error(function (err) {
        console.log(`Неуспешен опит да изтриете обявата!` + err);
        alertify.error(`Неуспешен опит да изтриете обява ${name}.`);
      });
  }
}

function add(adData) {
  let ad = adData;
  let adsContainer = $('#list-ads');
  let newAd = "states/admin/admin-new.html";

  adsContainer.prepend(`<img ng-if=${ad.img1.url} src=${ad.img1.url}/>`);
  //$('#newDivId').load(newAd);
}

function close() {
  // de-blur all ads and header
  $('[md-page-header]').removeClass('blur');
  $('md-list-item')
    .removeClass('blur')
    .removeClass('clicked')
    .addClass('notClicked');

  clickedAdDiv.find("#menu-open").prop('checked', false);
}