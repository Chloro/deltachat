module.exports = /*@ngInject*/ function(
  $uibModal
) {

  /**
   * Function to provide an alert modal.
   *
   * @param {array|string} alertMessages - String or array of strings to be displayed on the modal.
   * @param {string} [alertType = warning] - Optional string to determine the color of modal to display,
   * defaults to warning orange. Uses bootstrap color terms.
   * @param {boolean} [isBlocking] - If set to true, the modal will not close unless the X in the corner is clicked,
   * also displays a darkened background indicating to the user that the modal must be addressed.
   * @param {number} [duration] - Time in ms to wait before closing the modal, if unspecified it will not close.
   */
  function openAlertModal(alertMessages, alertType, isBlocking, duration) {
    $uibModal.open({
      backdrop: isBlocking ? 'static' : true,
      backdropClass: isBlocking ? '' : 'hide-modal-backdrop',
      controller: 'alertModalController',
      keyboard: !isBlocking,
      size: 'md',
      resolve: {
        alertMessages: function() {
          var messages;
          if (typeof alertMessages === 'string') {
            messages = [alertMessages];
          } else {
            messages = alertMessages;
          }
          return messages;
        },
        alertType: function() {
          return alertType || 'warning';
        },
        duration: function() {
          return duration;
        }
      },
      templateUrl: '/shared/components/alert-modal/alert-modal.html'
    });
  }

  return {
    openAlertModal: openAlertModal
  };
};

