export /* @ngInject */ function adminRoutes($stateProvider) {
  $stateProvider

    .state('admin', {
      url: '/admin',
      templateUrl: '/states/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'Admin'
    });
}
