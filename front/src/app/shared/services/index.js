module.exports = angular.module('deltaChat.shared.services', [])
    .factory('authenticationService', require('./authentication.service'))
    .factory('httpInterceptor', require('./httpInterceptor.service'))
    .factory('localeService', require('./locale.service'))
    .factory('sessionStorageService', require('./sessionStorage.service'))
;
