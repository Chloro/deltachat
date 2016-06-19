module.exports = /*@ngInject*/ function(
    $document,
    $rootScope,
    $state,
    $translate,
    authenticationService,
    localeConstant,
    sessionStorageService,
    stateConstant,
    tmhDynamicLocale
) {

  $rootScope.build = require('./version');

  // Get the locale code from the currently loaded language.
  var localeCode = $translate.proposedLanguage().toLowerCase().replace(/_/g, '-');
  // Sets the locale based on the language (which is detected from the browser or loaded from local storage).
  tmhDynamicLocale.set(localeCode);

  $rootScope.$on('$translateChangeSuccess', function (event, data) {
    localeCode = data.language.toLowerCase().replace(/_/g, '-');
    $document[0].documentElement.setAttribute('lang', localeConstant.locales[localeCode].lang);
    tmhDynamicLocale.set(localeCode);
  });

  /* Send the user to the sign-in page if the route requires authentication and they do not have
   * a token or it has expired.
   */
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.authenticate) {
      var token = sessionStorageService.getAuthToken();
      var isAuthenticated = !authenticationService.isTokenExpired(token) || false;

      if (!token || (token && !isAuthenticated)) {
        event.preventDefault();

        sessionStorageService.deleteAuthToken();
        sessionStorageService.deleteCurrentUser();

        $rootScope.showSideNav = false;
        $rootScope.showHeaderFooter = false;

        $state.transitionTo(stateConstant.SIGN_IN);
      } else {
        $rootScope.showSideNav = true;
        $rootScope.showHeaderFooter = true;
      }
    } else if (toState.name === stateConstant.SIGN_IN) {
      $rootScope.showSideNav = false;
      $rootScope.showHeaderFooter = false;
    } else {
      $rootScope.showSideNav = true;
      $rootScope.showHeaderFooter = true;
    }
  });

};
