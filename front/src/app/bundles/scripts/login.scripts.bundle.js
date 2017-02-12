module.exports = angular.module('deltachat-ui.bundle.login', [
  require('../../shared/components/login').name
])
    .controller('loginController', require('../../pages/login/login.controller.js'))
;
