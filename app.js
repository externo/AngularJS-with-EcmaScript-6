/* globals __dirname */

import angular from 'angular';
import angularMaterial from 'angular-material';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';

import 'assets/stylesheets/application.scss';

import Models     from 'models/models';
import Services   from 'services/services';
import Directives from 'directives/directives';
import Components from 'components/components';
import Filters    from 'filters/filters';
import Config     from 'config/config';
import Routes     from 'config/routes/routes';
import States     from 'states/states';

// Import all html files to put them in $templateCache
// If you need to use lazy loading, you will probably need
// to remove these two lines and explicitly require htmls
const templates = require.context(__dirname, true, /\.html$/);

(function(){
  'use strict';
  templates.keys().forEach(templates);

  angular.module('AutoAds', [
    angularMaterial,
    Models.name,
    Services.name,
    Directives.name,
    Components.name,
    Filters.name,
    Config.name,
    Routes.name,
    States.name,
  ]);

  // check if admin is logged in
  angular.module('AutoAds')
    .run(
    // @ngInject
    function ($rootScope, $location, Auth) {
      $rootScope.$on('$locationChangeStart', function () {
        if ($location.path().indexOf("/admin") != -1 && !Auth.isLoggedIn()) {
          $location.path("/");
        }
      });
    }
  );

  angular.element(document).ready(() =>
    angular.bootstrap(document, ['AutoAds'], {
      strictDi: true
    }));
})();
