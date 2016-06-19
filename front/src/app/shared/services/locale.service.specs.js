var service = require('./locale.service.js');

describe('localeService', function() {
  var instance;
  var $rootScope;
  var $translate;
  var localeConstant;
  var tmhDynamicLocale;

  function createInstance() {
    instance = service(
        $rootScope,
        $translate,
        localeConstant
    );
  }

  beforeEach(angular.mock.inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $translate = {
      use: function() {},
      proposedLanguage: function(){}
    };
    localeConstant = require('../constants/locale.constant');
    spyOn($translate, 'use');
    spyOn($translate, 'proposedLanguage').and.returnValue('de_DE');
    createInstance();
  }));

  describe('getLocales', function() {
    it('should return a list of locales', function() {
      var locales = instance.getLocales();
      expect(locales.ar.name).toBeDefined();
      expect(locales.de.name).toBeDefined();
      expect(locales['en-us'].name).toBeDefined();
      expect(locales['en-gb'].name).toBeDefined();
      expect(locales.fr.name).toBeDefined();
      expect(locales['zh-cn'].name).toBeDefined();
    });
  });

  describe('setLocale', function() {
    it('should set the locale and language based on the localCode argument', function() {
      instance.setLocale('fr');
      expect($translate.use).toHaveBeenCalledWith('fr');
    });

    it('should not set the locale and language based on the localCode argument if the code is invalid', function() {
      instance.setLocale('notreal-notreal');
      expect($translate.use.calls.any()).toEqual(false);
    });
  });

  describe('getLocale', function() {
    it('should return the locale info for the current locale if one has been set', function() {
      instance.setLocale('de');
      var locale = instance.getLocale();
      expect(locale.langCode).toBeDefined();
      expect(locale.localeCode).toBeDefined();
      expect(locale.name).toBeDefined();
      expect(locale.lang).toBeDefined();
    });
  });
});
