module.exports = /*@ngInject*/ function(
    $document,
    $rootScope,
    $state,
    $translate,
    $window,
    authenticationService,
    endpointConstant,
    localeConstant,
    localStorageService,
    runtimeRouter,
    sessionStorageKeyConstant,
    sessionStorageService,
    stateConstant,
    statesService,
    tmhDynamicLocale
) {

  $rootScope.build = require('./version');
  runtimeRouter.setUpStates(statesService.getStates());
  var localeCode = $translate.proposedLanguage().toLowerCase().replace(/_/g, '-');
  tmhDynamicLocale.set(localeCode);

  $rootScope.$on('$translateChangeSuccess', function (event, data) {
    localeCode = data.language.toLowerCase().replace(/_/g, '-');
    $document[0].documentElement.setAttribute('lang', localeConstant.locales[localeCode].lang);
    tmhDynamicLocale.set(localeCode);
  });

  /* Send the user to the login page if the route requires authentication and they do not have
   * a token or it has expired.
   */
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    authenticate(event, toState);
  });

  // $rootScope.$on('$stateChangeSuccess', function(event, toState) {
  //   showSidebar(event, toState);
  // });

  function authenticate(event, toState) {
    if (toState.authenticate) {
      var token = sessionStorageService.get(sessionStorageKeyConstant.AUTH_TOKEN);
      var isAuthenticated = !authenticationService.isTokenExpired(token) || false;

      if (!token || (token && !isAuthenticated)) {
        event.preventDefault();
        sessionStorageService.clearSession();
        $rootScope.showHeader = false;
        $state.transitionTo(stateConstant.LOGIN);
      } else {
        $rootScope.showHeader = true;
      }
    } else if (toState.name === stateConstant.LOGIN) {
      $rootScope.showHeader = false;
    } else {
      $rootScope.showHeader = true;
    }
  }

  // function showSidebar(event, toState) {
  //   if (toState.name === stateConstant.SIGN_IN) {
  //     $rootScope.showSideNav = false;
  //   } else if (toState.name === stateConstant.DEFAULT) {
  //     $rootScope.showSideNav = true;
  //     sessionStorageService.set(sessionStorageKeyConstant.SHOW_SIDEBAR, $rootScope.showSideNav);
  //   } else {
  //     var sessionStorageValue = sessionStorageService.get(sessionStorageKeyConstant.SHOW_SIDEBAR);
  //     $rootScope.showSideNav = !!sessionStorageValue;
  //   }
  // }

  // Remove momentjs from the standard global scope to avoid accidental use in a non-angular way.
  if ($window.moment) {
    $window._doNotUse = $window._doNotUse || {};
    $window._doNotUse.moment = $window.moment;

    try {
      delete $window.moment;
    } catch (e) {
      // IE8 doesn't do delete of window vars, make undefined if delete error
      $window.moment = undefined;
    }
  }

};
