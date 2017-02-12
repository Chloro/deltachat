module.exports = function() {
  return {
    restrict: 'E',
    replace: false,
    link: function(scope, element) {
      element.on('keydown', function($event) {
        // 13 = enter
        // 32 = spacebar
        if ($event.keyCode === 13 || $event.keyCode === 32) {
          $event.preventDefault();
          element.triggerHandler('click');
        }
      });
    }
  };
};
