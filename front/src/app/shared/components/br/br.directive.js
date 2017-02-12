module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs) {
      if (!attrs.ariaHidden) {
        element.attr('aria-hidden', 'true');
      }
    }
  };
};
