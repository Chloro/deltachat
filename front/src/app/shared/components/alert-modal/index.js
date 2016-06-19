module.exports = angular.module('deltaChat.shared.components.alert.alert-modal', [])
    .factory('alertModalService', require('./alert-modal.service.js'))
    .controller('alertModalController', require('./alert-modal.controller.js'))
;
