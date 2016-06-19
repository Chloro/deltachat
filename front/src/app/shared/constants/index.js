module.exports = angular.module('deltaChat.shared.constants', [])
    .constant('endpointConstant', require('./endpoint.constant'))
    .constant('errorConstant', require('./error.constant'))
    .constant('localeConstant', require('./locale.constant'))
    .constant('routeConstant', require('./route.constant'))
    .constant('sessionStorageKeyConstant', require('./sessionStorageKey.constant'))
    .constant('stateConstant', require('./state.constant'))
    .constant('statusConstant', require('./status.constant'))
;
