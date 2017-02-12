module.exports = function() {
  return {
    restrict: 'E',
    link: function (scope, element) {
      element.on('submit', function () {
        var invalidInput = element[0].querySelector('.ng-invalid');

        if (invalidInput) {
          invalidInput.focus();
        }
      });
    }
  };
};
