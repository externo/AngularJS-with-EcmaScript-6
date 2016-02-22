import { uploadImage } from './upload-image';
import { scroll } from './scroll';
import { showTab } from './show-tab';
import angular from 'angular';
import { ifEnv } from 'directives/if-env';

export default angular.module('AutoAds.directives', [])
  .directive('ifEnv', ifEnv)
  .directive('showTab', showTab)
  .directive('scroll', scroll)
  .directive('uploadImage', uploadImage);
