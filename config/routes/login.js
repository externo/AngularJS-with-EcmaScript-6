export /* @ngInject */ function loginRoutes($stateProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: '/states/login/login.html',
      controller: 'LoginController',
      controllerAs: 'Login'
    });
}
