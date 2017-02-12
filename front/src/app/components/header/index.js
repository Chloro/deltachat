module.exports = angular.module('deltachat-ui.components.header', [])
  .directive('header', require('./header.directive'))
  .controller('headerController', require('./header.controller'))
;
