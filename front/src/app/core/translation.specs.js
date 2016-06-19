var config = require('./translation.js');

describe('translation app configuration', function() {
  var $translateProvider;
  var tmhDynamicLocaleProvider;
  var instance;

  function createInstance() {
    instance = config(
      $translateProvider,
      tmhDynamicLocaleProvider
    );
  }

  beforeEach(angular.mock.inject(function($injector) {
    $translateProvider = {
      determinePreferredLanguage: function(){},
      useLocalStorage: function(){},
      useMissingTranslationHandlerLog: function(){},
      useStaticFilesLoader: function(){},
      useSanitizeValueStrategy: function(){},
      registerAvailableLanguageKeys: function(){}
    };
    tmhDynamicLocaleProvider = {
      localeLocationPattern: function() {}
    };
    spyOn($translateProvider, 'determinePreferredLanguage').and.callThrough();

    spyOn($translateProvider, 'useMissingTranslationHandlerLog').and.callThrough();
    spyOn($translateProvider, 'useStaticFilesLoader').and.callThrough();
    spyOn($translateProvider, 'useLocalStorage').and.callThrough();
    spyOn($translateProvider, 'registerAvailableLanguageKeys').and.callThrough();
    spyOn($translateProvider, 'useSanitizeValueStrategy').and.callThrough();
    spyOn(tmhDynamicLocaleProvider, 'localeLocationPattern').and.callThrough();
    createInstance();
  }));

  describe('on initialization', function() {
    it('should call tmhDynamicLocaleProvider.localeLocationPattern with the correct directory', function() {
      expect(tmhDynamicLocaleProvider.localeLocationPattern).toHaveBeenCalledWith('/assets/angular-locale_{{locale}}.js');
    });
    it('should call $translateProvider.useMissingTranslationHandlerLog', function() {
      expect($translateProvider.useMissingTranslationHandlerLog).toHaveBeenCalled();
    });
    it('should call $translateProvider.useStaticFilesLoader with the correct config', function() {
      expect($translateProvider.useStaticFilesLoader).toHaveBeenCalledWith({
        prefix: '/assets/language-',
        suffix: '.json'
      });
    });
    it('should call $translateProvider.useLocalStorage', function() {
      expect($translateProvider.useLocalStorage).toHaveBeenCalled();
    });
    it('should call $translateProvider.determinePreferredLanguage', function() {
      expect($translateProvider.determinePreferredLanguage).toHaveBeenCalled();
    });
    it('should call $translateProvider.useLocalStorage', function() {
      expect($translateProvider.registerAvailableLanguageKeys).toHaveBeenCalled();
    });
    it('should call $translateProvider.useSanitizeValueStrategy', function() {
      expect($translateProvider.useSanitizeValueStrategy).toHaveBeenCalledWith('escape');
    });
  });

});
