module.exports = /*@ngInject*/ function(
  $translateProvider,
  tmhDynamicLocaleProvider
) {

  tmhDynamicLocaleProvider.localeLocationPattern('/assets/angular-locale_{{locale}}.js');
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/language-',
    suffix: '.json'
  });
  $translateProvider.useLocalStorage();
  $translateProvider.registerAvailableLanguageKeys([
    'ar',
    'ar_EG',
    'de',
    'en',
    'en_GB',
    'en_US',
    'fr',
    'zh_CN',
    'zh_TW'
  ], {
    'ar': 'ar',
    'ar_EG': 'ar_EG',
    'de': 'de',
    'en': 'en',
    'en_US': 'en_US',
    'en_GB': 'en_GB',
    'fr': 'fr',
    'zh_CN': 'zh_CN',
    'zh_TW': 'zh_TW'
  });
  $translateProvider.determinePreferredLanguage();
  $translateProvider.useLocalStorage();
  $translateProvider.useSanitizeValueStrategy('escape');
};
