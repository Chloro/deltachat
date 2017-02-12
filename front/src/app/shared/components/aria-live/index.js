module.exports = angular.module('deltachat-ui.shared.components.aria-live', [])
  .constant('dcAriaLiveConstants', require('./aria-live.constant'))
  .directive('dcAriaLive', require('./aria-live.directive'))
;
