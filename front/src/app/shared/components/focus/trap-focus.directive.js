module.exports = /*@ngInject*/ function(keyboardConstant) {
  return {
    restrict: 'A',
    replace: false,
    scope: {
      trapFocus: '='
    },
    link: function(scope, element, attrs) {
      var tabableSelector = 'a[href], area[href], input:not([disabled]), ' +
          'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
          'iframe, object, embed, *[tabindex], *[contenteditable=true]';

      function loadFocusElementList(modal) {
        if (modal) {
          var elements = modal.querySelectorAll(tabableSelector);

          return elements ?
              Array.prototype.filter.call(elements, function(element) {
                return isVisible(element);
              }) : elements;
        }
      }

      function isVisible(element) {
        return !!(element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length);
      }

      function isFocusInFirstItem(evt, list) {
        if (list.length) {
          return (evt.target || evt.srcElement) === list[0];
        }

        return false;
      }

      function isFocusInLastItem(evt, list) {
        if (list.length) {
          return (evt.target || evt.srcElement) === list[list.length - 1];
        }

        return false;
      }

      function isModalFocused(evt, modalWindow) {
        if (evt && modalWindow) {
          return (evt.target || evt.srcElement) === modalWindow;
        }

        return false;
      }

      function focusFirstFocusableElement(list) {
        if (list.length) {
          list[0].focus();
          return true;
        }

        return false;
      }

      function focusLastFocusableElement(list) {
        if (list.length) {
          list[list.length - 1].focus();
          return true;
        }

        return false;
      }

      function onKeydown($event) {
        if (!scope.trapFocus) {
          return;
        }

        var key = $event.which;

        if (key === keyboardConstant.TAB) {
          var modal = element[0];
          var list = loadFocusElementList(modal);
          var focusChanged = false;

          if ($event.shiftKey) {
            if (isFocusInFirstItem($event, list) || isModalFocused($event, modal)) {
              focusChanged = focusLastFocusableElement(list);
            }
          } else {
            if (isFocusInLastItem($event, list) || isModalFocused($event, modal)) {
              focusChanged = focusFirstFocusableElement(list);
            }
          }

          if (focusChanged) {
            $event.preventDefault();
            $event.stopPropagation();
          }
        }
      }

      element.on('keydown', onKeydown);
    }
  };
};