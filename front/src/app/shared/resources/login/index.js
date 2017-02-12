module.exports = angular.module('deltachat-ui.shared.resources.authentication', [])
    .factory('loginService', require('./login.service.js'))
    .factory('loginResource', require('./login.resource.js'))
;
