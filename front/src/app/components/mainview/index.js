module.exports = angular.module('deltachat-ui.components.mainview', [])
  .controller('mainViewController', require('./mainview.controller'))
  .directive('mainView', require('./mainview.directive'))
;
