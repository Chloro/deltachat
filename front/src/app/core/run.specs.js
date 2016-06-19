var factory = require('./run.js');
var localeConstant = require('../shared/constants/locale.constant');
var stateConstant = require('../shared/constants/state.constant');

describe('app.run', function() {
  var $document;
  var $rootScope;
  var $state;
  var $translate;
  var authenticationService;
  var instance;
  var sessionStorageService;
  var tmhDynamicLocale;

  function createInstance() {
    instance = factory(
        $document,
        $rootScope,
        $state,
        $translate,
        authenticationService,
        localeConstant,
        sessionStorageService,
        stateConstant,
        tmhDynamicLocale
    );
  }

  beforeEach(angular.mock.inject(function($injector) {
    $document = $injector.get('$document');
    $rootScope = $injector.get('$rootScope');

    $state = {
      transitionTo: function(){}
    };

    $translate = {
      proposedLanguage: function(){return 'current-lang';}
    };

    authenticationService = {
      isTokenExpired: function(){}
    };

    sessionStorageService = {
      deleteAuthToken: function() {},
      deleteCurrentUser: function() {},
      getAuthToken: function() {}
    };

    tmhDynamicLocale = {
      set: function() {}
    };

    spyOn(authenticationService, 'isTokenExpired').and.callThrough();
    spyOn(sessionStorageService, 'deleteAuthToken').and.callThrough();
    spyOn(sessionStorageService, 'deleteCurrentUser').and.callThrough();
    spyOn(sessionStorageService, 'getAuthToken').and.returnValue('test.token');
    spyOn(tmhDynamicLocale, 'set').and.callThrough();
    spyOn($state, 'transitionTo').and.callThrough();

    createInstance();
  }));

  describe('on $stateChangeStart', function() {
    describe('on authenticated routes', function() {
      it('should only allow the user to access the state if have a valid token. If not, the current token and ' +
         'user should be removed from session and the user routed to the sign-in page', function() {
        sessionStorageService.getAuthToken.and.returnValue(undefined);
        var fakeStateChangeSuccess = {authenticate: true, url: '/testUrl'};
        $rootScope.$emit('$stateChangeStart', fakeStateChangeSuccess);
        expect(sessionStorageService.deleteAuthToken).toHaveBeenCalled();
        expect(sessionStorageService.deleteCurrentUser).toHaveBeenCalled();
        expect($rootScope.showHeaderFooter).toEqual(false);
        expect($state.transitionTo).toHaveBeenCalledWith('sign-in');
      });

      it('should only allow the user to access the state if their token has not expired. If it is expired, the ' +
         'current token and user should be removed from session and the user routed to the sign-in page', function() {
        authenticationService.isTokenExpired.and.returnValue(true);
        var fakeStateChangeSuccess = {authenticate: true, url: '/testUrl'};
        $rootScope.$emit('$stateChangeStart', fakeStateChangeSuccess);
        expect(sessionStorageService.deleteAuthToken).toHaveBeenCalled();
        expect(sessionStorageService.deleteCurrentUser).toHaveBeenCalled();
        expect($rootScope.showHeaderFooter).toEqual(false);
        expect($state.transitionTo).toHaveBeenCalledWith('sign-in');
      });

      it('should allow the user to access the state if they have a token and it has not expired. ', function() {
        authenticationService.isTokenExpired.and.returnValue(false);
        var fakeStateChangeSuccess = {authenticate: true, url: '/testUrl'};
        $rootScope.$emit('$stateChangeStart', fakeStateChangeSuccess);
        expect(sessionStorageService.deleteAuthToken.calls.any()).toEqual(false);
        expect(sessionStorageService.deleteCurrentUser.calls.any()).toEqual(false);
        expect($rootScope.showHeaderFooter).toEqual(true);
        expect($state.transitionTo.calls.any()).toEqual(false);
      });
    });

    describe('on non-authenticated routes', function() {
      it('Should not check for token or reroute to sign-in', function(){
        var fakeStateChangeSuccess = {authenticate: false, url: '/testUrl'};
        $rootScope.$emit('$stateChangeStart', fakeStateChangeSuccess);
        expect(authenticationService.isTokenExpired.calls.any()).toEqual(false);
        expect(sessionStorageService.getAuthToken.calls.any()).toEqual(false);
        expect($rootScope.showHeaderFooter).toEqual(true);
      });

      it('Should not check for token or reroute to sign-in', function(){
        var fakeStateChangeSuccess = {authenticate: false, name: 'sign-in'};
        $rootScope.$emit('$stateChangeStart', fakeStateChangeSuccess);
        expect($rootScope.showHeaderFooter).toEqual(false);
      });
    });
  });

  describe('on $translateChangeSuccess event on $rootScope', function() {
    it('should set the locale matching the language and modify the html lang attribute to match', function() {
      var fakeTranslationSuccessData = {language: 'en_US'};
      $rootScope.$emit('$translateChangeSuccess', fakeTranslationSuccessData);
      expect(tmhDynamicLocale.set).toHaveBeenCalledWith('en-us');
    });
  });
});
