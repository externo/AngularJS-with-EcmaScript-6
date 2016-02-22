const HTTP = new WeakMap();

let partUrl;
let partHeaders;
let categoriesUrl;

export class Ads {


  // @ngInject
  constructor($http, REST_URL, REST_HEADERS) {
    partUrl = REST_URL + 'Part/';
    categoriesUrl = REST_URL + 'Category/';
    partHeaders = REST_HEADERS;
    HTTP.set(this, $http);
  }

  getAds() {
    return HTTP.get(this)
      .get(partUrl, partHeaders)
      .then(result => this.ads = result);
  }

  getCategories() {
    return HTTP.get(this)
      .get(categoriesUrl, partHeaders)
      .then(result => this.categories = result);
  }
}
