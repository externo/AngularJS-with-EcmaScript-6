import { LoginController } from './login/login';
import angular            from 'angular';
import { HomeController } from 'states/home/home';
import { AdminController } from './admin/admin';
//import { AdminPublishController } from './admin/admin-publish';

export default angular.module('AutoAds.controllers', [])
  .controller('HomeController', HomeController)
  .controller('AdminController', AdminController)
  //.controller('AdminPublishController', AdminPublishController)
  .controller('LoginController', LoginController);
