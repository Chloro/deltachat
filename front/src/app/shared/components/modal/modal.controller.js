module.exports = /*@ngInject*/ function(
    $document,
    $scope
) {

  $scope.focusCloseButton = function($event) {
    $event.preventDefault();
    $document[0].querySelector('#modal-close').focus();
  };

};
