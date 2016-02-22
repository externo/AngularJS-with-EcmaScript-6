let authService;

export class LoginController {

  // @ngInject
  constructor(Auth) {
    this.userData = {};
    authService = Auth;
  }

  login(userData){
    authService.login(userData);
  }
}
