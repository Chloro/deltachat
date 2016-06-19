var angular = require('angular');
window._ = require('lodash');

require('ngstorage/ngStorage');
require('angular-uuid');

angular.module('deltaChat', [
    require('angular-animate'),
    require('angular-aria'),
    require('angular-sanitize'),
    require('angular-ui-bootstrap'),
    require('angular-ui-router'),
    require('angular-translate'),
    require('angular-cookies'),
    require('angular-resource'),
    require('angular-translate-loader-static-files'),
    require('angular-translate-storage-cookie'),
    require('angular-translate-storage-local'),
    require('angular-dynamic-locale'),
    'ngStorage',
    'angular-uuid',
    require('../components').name,
    require('../pages').name,
    require('../shared').name
  ])
  .config(require('./translation'))
  .config(require('./states'))
  .config(/*@ngInject*/ function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  })
  .run(require('./run'))
;
