import $ from "jquery";

const INIT = new WeakMap();
const SERVICE = new WeakMap();

export class AdminPublishController {

  // @ngInject
  constructor(Ads, $location, $http) {

    SERVICE.set(this, Ads);

    INIT.set(this, () => {
      SERVICE.get(this)
        .getCategories()
        .then(ads => {
          this.categories = ads.data.results;
        });
    });

    INIT.get(this)();
  }

  fileSelected1(fileInputField) {
    var file = fileInputField.files[0];
    if (file.type.match(/image\/.*/)) {

      // show image immedeately
      var reader = new FileReader();
      reader.onload = function () {
        $("#upload-image")
          .html("<span></span>" +
          "<label class='md-button' md-ink-ripple for='image'>" +
          "<img src='" + reader.result + "'>" +
          "</label>" +
          "<input id='image' type='file' onchange='publish.fileSelected1(this)' />");
      };
      reader.readAsDataURL(file);

      // get simple filename
      var startIndex = file.name.indexOf('\\') >= 0 ? file.name.lastIndexOf('\\') : file.name.lastIndexOf('/');
      var filename = file.name.substring(startIndex);

      //upload image to parse.com
      var requestImage = {
        method: 'POST',
        url: baseUrl + 'files/' + filename,
        headers: headersImage.headers,
        data: file
      };
      $http(requestImage)
        .success(function (imgData) {
          imgData.__type = 'File';

          // attach image name to object, next send to parse.com
          publish.adData.img1 = imgData;
          console.log("Снимката е качена!");
        })
        .error(function (err) {
          console.log("Има проблем със добавянето на снимката!", err);
        });
    } else {
      $("#upload-image").html("<p>Опитваш се да качиш файл, различен от снимка!</p>");
    }
  }

  publishAd(adData) {
    var request = {
      method: 'POST',
      url: baseUrl + 'classes/Part',
      headers: headers.headers,
      data: adData
    };
    $http(request)
      .success(function (data) {
        console.log("Обявата е добавена успешно.");

        // TODO:add child element and not to reload!
      })
      .error(function (err) {
        console.log("Има проблем със добавянето на обявата!", err);
      });
  }
}
