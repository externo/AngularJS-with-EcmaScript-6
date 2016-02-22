import alertify from 'alertify.js';

const HTTP = new WeakMap();

let location;
let loginUrl;
let restHeaders;

export class Auth {

  // @ngInject
  constructor($http, LOGIN_URL, REST_HEADERS, $location) {
    location = $location;
    loginUrl = LOGIN_URL;
    restHeaders = REST_HEADERS;
    HTTP.set(this, $http);
  }

  login(userData) {
    var url = loginUrl + '?username=' + userData.username + '&password=' + userData.password;
    HTTP.get(this)
      .get(url, restHeaders)
      .success(function (data) {
        sessionStorage['currentUser'] = JSON.stringify(data);
        alertify.log(`Здравей ${data.username}.`);
        location.path("/admin");
      })
      .error(function (error) {
        alertify.error(`Проблем с автентикацията ${userData.username}.`);
      });
  }

  register(userData, success, error) {
    var request = {
      method: 'POST',
      url: loginUrl + 'users',
      data: userData
    };
    $http(request)
      .success(function (data) {
        sessionStorage['currentUser'] = JSON.stringify(data);
        success(data);
      })
      .error(error);
  }

  logout() {
    let username = JSON.parse(sessionStorage['currentUser']).username;
    delete sessionStorage['currentUser'];
    alertify.logPosition("top right").log(`До скоро ${username}.`);
    location.path("/");
  }

  getCurrentUser() {
    var userObject = sessionStorage['currentUser'];
    if (userObject) {
      return JSON.parse(sessionStorage['currentUser']);
    }
  }

  isAnonymous() {
    return sessionStorage['currentUser'] == undefined;
  }

  isLoggedIn() {
    return sessionStorage['currentUser'] != undefined;
  }

  isNormalUser() {
    var currentUser = this.getCurrentUser();
    return (currentUser != undefined) && (!currentUser.isAdmin);
  }

  isAdmin() {
    var currentUser = this.getCurrentUser();
    return (currentUser != undefined) && (currentUser.isAdmin);
  }

  getAuthHeaders() {
    var restHeaders = {};
    var currentUser = this.getCurrentUser();
    if (currentUser) {
      restHeaders['Authorization'] = 'Bearer ' + currentUser.access_token;
    }
    return restHeaders;
  }
}
