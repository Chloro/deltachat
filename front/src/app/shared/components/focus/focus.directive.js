module.exports = /*@ngInject*/ function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      focusValue: '<focus'
    },
    link: function ($scope, element) {
      $scope.$watch('focusValue', function (value) {
        $timeout(function () {
          if (value) {
            element[0].focus();
          }
        }, 0, true);
      });
    }
  };
};
