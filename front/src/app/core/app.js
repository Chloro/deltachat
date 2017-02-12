angular.module('deltachat-ui', [
  'ngAnimate',
  'ngAria',
  'ngSanitize',
  'ui.router',
  'pascalprecht.translate',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'oc.lazyLoad',
  'tmh.dynamicLocale',
  'ngStorage',
  'ngMaterial',
  'angular-uuid',
  require('../bundles/scripts/minimum.scripts.bundle.js').name
])
    .factory('statesService', require('./states.service'))
    .provider('runtimeRouter', require('./runtime-router')())
    .config(/*@ngInject*/ function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    })
    .config(require('./resource-provider'))
    .config(require('./material-theme'))
    .config(require('./translation'))
    .run(/*@ngInject*/ function($templateCache){
      var minimumTemplates = require('../bundles/templates/minimum.templates.bundle.js');
      minimumTemplates.forEach(function(template) {
        $templateCache.put(template.key, template.html);
      });
    })
    .run(require('./run'))
;
