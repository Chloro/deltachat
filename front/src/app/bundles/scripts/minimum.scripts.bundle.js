//The absolute bare modules required to load the application (minus states)
module.exports = angular.module('deltachat-ui.bundles.minimum', [
  require('../../components').name,
  require('../../shared/components/a').name,
  require('../../shared/components/aria-live').name,
  require('../../shared/components/br').name,
  require('../../shared/components/focus').name,
  require('../../shared/components/form').name,
  require('../../shared/components/i').name,
  require('../../shared/components/modal').name,
  require('../../shared/components/nav-menu').name,
  require('../../shared/constants').name,
  require('../../shared/resources/login').name
])
    .factory('$moment', require('../../shared/services/momentjs.service.js'))
    .factory('authenticationService', require('../../shared/services/authentication.service.js'))
    .factory('bundleResolverProviderService', require('../../shared/services/bundle-resolver-provider.service.js'))
    .factory('errorService', require('../../shared/services/error.service.js'))
    .factory('httpInterceptor', require('../../shared/services/httpInterceptor.service.js'))
    .factory('localeService', require('../../shared/services/locale.service.js'))
    .factory('localStorageService', require('../../shared/services/local-storage.service.js'))
    .factory('sessionStorageService', require('../../shared/services/sessionStorage.service.js'))
;
