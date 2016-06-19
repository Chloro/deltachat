var service = require('./httpInterceptor.service.js');

describe('httpInterceptorService', function() {
  var $q;
  var config;
  var instance;
  var localeServiceMock;
  var sessionStorageServiceMock;
  var uuidMock;

  function createInstance() {
    instance = service(
        $q,
        localeServiceMock,
        sessionStorageServiceMock,
        uuidMock
    );
  }

  beforeEach(angular.mock.inject(function($injector) {
    $q = $injector.get('$q');
    config = {headers: {}};
    localeServiceMock = {getLocale: function(){}};
    sessionStorageServiceMock = {
      getAuthToken: function(){},
      getTrackingId: function(){},
      setTrackingId: function(){}
    };
    uuidMock = {v4: function(){}};
    spyOn(localeServiceMock, 'getLocale').and.returnValue({lang: 'fr'});
    spyOn(sessionStorageServiceMock, 'setTrackingId');
    spyOn(sessionStorageServiceMock, 'getTrackingId');
    spyOn(sessionStorageServiceMock, 'getAuthToken');
    createInstance();
  }));

  describe('request', function() {
    it('should set the accept header to: application/json, text/plain, */*', function() {
      config.url = 'choice-edge/rates';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers.Accept).toEqual('application/json, text/plain, */*');
    });

    it('should set the choice edge requestor to EDGE_UI', function() {
      config.url = 'choice-edge/rates';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers['X-ChoiceEdge-Requestor']).toEqual('EDGE_UI');
    });

    it('should set the Accept-Language to based on the users stored locale.', function() {
      config.url = 'choice-edge/rates';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers['Accept-Language']).toEqual('fr');
    });

    it('should not set Authorization header if a token is not in session', function() {
      config.url = 'choice-edge/rates';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toBeUndefined();
    });

    it('should set Authorization header if a token is in session', function() {
      config.url = 'choice-edge/rates';
      sessionStorageServiceMock.getAuthToken = jasmine.createSpy().and.returnValue('a55f09fa-1234-11e6-a148-3e1d05defe78');
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toEqual('Bearer a55f09fa-1234-11e6-a148-3e1d05defe78');
    });

    it('should not set TrackingID header if a trackingID is not in session', function() {
      config.url = 'choice-edge/rates';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers['X-ChoiceEdge-TrackingId']).toBeUndefined();
    });

    it('should set TrackingID header if a tracking id is in session', function() {
      config.url = 'choice-edge/rates';
      sessionStorageServiceMock.getTrackingId = jasmine.createSpy().and.returnValue('000007');
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers['X-ChoiceEdge-TrackingId']).toEqual('000007');
    });

    it('should set Content-Type header to application/x-www-form-urlencoded;charset=UTF-8 ' +
        'when posting to login', function() {
      config.url = 'choice-edge/agent-account/login';
      config.method = 'POST';
      var result = instance.request(config);
      expect(sessionStorageServiceMock.setTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getTrackingId).toHaveBeenCalled();
      expect(sessionStorageServiceMock.getAuthToken).toHaveBeenCalled();
      expect(result.headers['Content-Type']).toEqual('application/x-www-form-urlencoded;charset=UTF-8');
    });

  });
});
