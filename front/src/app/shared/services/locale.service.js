module.exports = /*@ngInject*/ function(
    $rootScope,
    $translate,
    localeConstant
) {

  var locales = localeConstant.locales;
  var currentLocale = locales[$translate.proposedLanguage().toLowerCase().replace(/_/g, '-')];

  function localeIsValid(localeCode) {
    return locales[localeCode] !== undefined;
  }

  //Switches language and the current locale
  function setLocale(localeCode) {
    if (localeIsValid(localeCode)) {
      currentLocale = locales[localeCode];
      $translate.use(currentLocale.langCode);
    }
  }

  function getLocale() {
    return currentLocale;
  }

  function getLocales() {
    return locales;
  }

  return {
    setLocale: setLocale,
    getLocale: getLocale,
    getLocales: getLocales
  };
};
