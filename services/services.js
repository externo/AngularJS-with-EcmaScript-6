import { Auth } from './auth';
import { Ads } from './ads';
import angular from 'angular';

export default angular.module('AutoAds.services', [])
  .service('Ads', Ads)
  .service('Auth', Auth);
