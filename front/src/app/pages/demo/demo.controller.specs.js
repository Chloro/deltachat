var controller = require('./demo.controller');

describe('demoController', function () {
  var $locale;
  var $q;
  var $rootScope;
  var $scope;
  var $timeout;
  var $translate;
  var alertModalService;
  var instance;
  var localeService;

  function createInstance() {
    instance = controller(
        $locale,
        $scope,
        $timeout,
        $translate,
        alertModalService,
        localeService
    );
  }

  beforeEach(angular.mock.inject(function ($injector) {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    $locale = $injector.get('$locale');
    $timeout = $injector.get('$timeout');
    $translate = function(){
      var deferred = $q.defer();
      deferred.resolve({'demo.alertModalDemo1': 'Test Message1', 'demo.alertModalDemo2': 'Test Message2'});
      return deferred.promise;
    };
    alertModalService = {
      openAlertModal: function(){}
    };
    $scope = $rootScope.$new();

    localeService = {
      setLocale: function() {},
      getLocale:  function() {return 'en-en';},
      getLocales:  function() {
        return {
          'de-de': {
            name: 'German',
            localeCode: 'de-de'
          },
          'en-us': {
            name: 'English',
            localeCode: 'en-us'
          }
        };
      }
    };

    createInstance();
  }));

  describe('Time tick', function () {
    it('should trigger after 1001 ms', function () {
      $timeout.flush(1001);
    });
  });

  describe('scope.updateLocale', function () {
    it('should call localeService to set the locale based on the given param', function () {
      spyOn(localeService, 'setLocale').and.callThrough();
      $scope.updateLocale('test');
      $timeout.flush();
      expect(localeService.setLocale).toHaveBeenCalled();
    });
  });

  describe('scope.openAlertModal', function () {
    it('should call alertModalService triggering a modal to open', function () {
      spyOn(alertModalService, 'openAlertModal').and.callThrough();
      $scope.openAlertModal();
      $scope.$digest();
      expect(alertModalService.openAlertModal).toHaveBeenCalledWith(
        ['Test Message1', 'Test Message2' ],
        undefined,
        undefined,
        undefined);
    });
  });

});
