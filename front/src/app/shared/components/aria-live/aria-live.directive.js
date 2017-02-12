module.exports = /*@ngInject*/ function(
    $rootScope,
    $timeout,
    dcAriaLiveConstants
) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div aria-live="{{tone}}" class="sr-only" aria-atomic="true">{{message}}</div>',
    scope: {
      delay: '=', // (integer) the milliseconds used in the timeout
      message: '=', // (string) the announcement - no HTML
      tone: '=' // (string) valid values are "polite" and "assertive"
    },
    link: function(scope) {
      scope.delay = dcAriaLiveConstants.DELAY;
      scope.message = dcAriaLiveConstants.MESSAGE;
      scope.tone = dcAriaLiveConstants.TONE;

      scope.$watch('message', function(current, previous) {
        if (!scope.message || angular.equals(current, previous)) {
          return; // exit if message is already empty or unchanged
        }

        $timeout(function() {
          $rootScope.ariaLive = {
            delay: dcAriaLiveConstants.DELAY,
            message: dcAriaLiveConstants.MESSAGE,
            tone: dcAriaLiveConstants.TONE
          };
        }, scope.delay);
      });
    }
  };
};
