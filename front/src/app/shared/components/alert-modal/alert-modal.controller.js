module.exports = /*@ngInject*/ function(
    $timeout,
    $scope,
    $uibModalInstance,
    alertMessages,
    alertType,
    duration
) {

  $scope.alertMessages = alertMessages;
  $scope.alertType = alertType;
  $scope.modal = $uibModalInstance;

  if (duration) {
    $timeout($uibModalInstance.close, duration);
  }

};
