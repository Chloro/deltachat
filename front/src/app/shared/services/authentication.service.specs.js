var errorConstant = require('../constants/error.constant');
var service = require('./authentication.service.js');

describe('authenticationService', function() {
  var $q;
  var $rootScope;
  var authenticationResource;
  var date;
  var instance;
  var mockToken;
  var resourceError;
  var resourceResponse;
  var servicePromise;
  var servicePromiseResult;
  var sessionStorageService;

  function createInstance() {
    instance = service(
        $q,
        authenticationResource,
        errorConstant,
        sessionStorageService
    );
  }

  beforeEach(angular.mock.inject(function($injector) {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    resourceResponse = {
      agentAccount: {
        defaultDutyCode: 'RA',
        displayName: 'testUser'
      },
      lifecycleExpirationDateTime: '2016-05-24T11:34:14Z[GMT]',
      authorizationToken: 'eyJrYWgiOiJhdXRoc2VydmljZS0yMDE1IiwiYWxnIjoiUlMyNTYifQ.eyJpYXQiOjE0NjQwNDY0NTQsImV4' +
      'cCI6MTQ2NDA0NzM1NCwic3ViIjoie1wicHJpbmNpcGFsc1wiOlt7XCJuYW1lXCI6XCJ1c2VybmFtZVwiLFwidmFsdWVcIjpcInJlc19h' +
      'Z2VudFwifSx7XCJuYW1lXCI6XCJjcnNkZWZSZXNJRFwiLFwidmFsdWVcIjpcIk1HQVJDXCJ9LHtcIm5hbWVcIjpcImNyc2RlZkR1dHlc' +
      'IixcInZhbHVlXCI6XCJSQVwifSx7XCJuYW1lXCI6XCJjblwiLFwidmFsdWVcIjpcIlJlcyBBZ2VudFwifV19IiwiaXNzIjoiQXV0aGVu' +
      'dGljYXRpb24gU2VydmljZSB2MSJ9.GYGsjNissWJ8iSj_u3odirYPCV-ovQu3WisRphWpHmXu0qzcBdIYvvnpLGeBev0kPuuVdB6C6Tg' +
      'olaj836YZNCL5lLxZB9Ne1P4QYhuyhpJmvqGVxT0TS4zxxuXH1QcczRTfIUEHDvQvoh5y30_icoWDmHggU3rcV40W0lPXKsuX4fOJL9S' +
      'h5rEgpc_wf7jiEMiYYE-UgfgrecGrVULyO1J4G26b8Q6e8D3gjhWHNTINMzzND3x6zIbWtFP62oyzuSFmbC5dFb1jRqXeYEiwHZUCnHF' +
      '2Y7pCDhjZoTTIpwqvPwIjWiLOQgKWUdMFAcLiyReVF3ASJrEU8N5TJFV2jg',
      tokenExpirationDateTime: '2016-05-23T23:49:14Z[GMT]'
    };

    resourceError = {
      data: {
        errors: {
          details: [
            {
              code: 'AUTHORIZATION_ERROR',
              message: 'Authorization Error',
              service: 'apigateway-v1',
              type: 'BUSINESS',
              version: '1.0.33.0'
            }
          ]
        }
      },
      status: 401,
      statusText: 'Unauthorized'
    };

    authenticationResource = {
      save: function(){
        var deferred = $q.defer();
        deferred.resolve(resourceResponse);
        return deferred.promise;
      }
    };

    sessionStorageService = {
      setAuthToken: function(){},
      setCurrentUser: function(){}
    };

    spyOn(authenticationResource, 'save').and.callThrough();
    spyOn(sessionStorageService, 'setAuthToken').and.callThrough();
    spyOn(sessionStorageService, 'setCurrentUser').and.callThrough();

    date = new Date();
  }));

  describe('authenticate', function() {
    it('should take username and password params and call the login service to authenticate the user. Upon success, ' +
        'a promise object will be formed from the response to include the token, lifecycleExpiration, tokenExpiration,' +
        'and the user information, This object will be returned and also stored into session storage.', function() {

      createInstance();
      servicePromise = instance.authenticate('testUsername', 'testPassword');
      expect(servicePromise.token).toBeUndefined();
      servicePromise.then(function(response){
        servicePromiseResult = response;
      });
      $rootScope.$apply();
      expect(servicePromiseResult.token).toBeDefined();
      expect(servicePromiseResult.token.token).toBeDefined();
      expect(servicePromiseResult.token.lifecycleExpiration).toEqual('2016-05-24T11:34:14Z[GMT]');
      expect(servicePromiseResult.token.lifecycleExpirationActual).toEqual(1464046454);
      expect(servicePromiseResult.token.tokenExpiration).toEqual('2016-05-23T23:49:14Z[GMT]');
      expect(servicePromiseResult.token.tokenExpirationActual).toEqual(1464047354);
      expect(servicePromiseResult.user).toBeDefined();
      expect(servicePromiseResult.user.defaultDutyCode).toEqual('RA');
      expect(servicePromiseResult.user.displayName).toEqual('testUser');
      expect(sessionStorageService.setAuthToken).toHaveBeenCalled();
      expect(sessionStorageService.setCurrentUser).toHaveBeenCalled();
    });

    it('should take username and password params and call the login service to authenticate the user. Upon failure, ' +
        'a promise object will be formed from the error which will be returned.', function() {

      authenticationResource = {
        save: function(){
          var deferred = $q.defer();
          deferred.reject(resourceError);
          return deferred.promise;
        }
      };
      createInstance();
      servicePromise = instance.authenticate('testUsername', 'testPassword');
      servicePromise.then(function(response){
        expect(response).toBeUndefined();
      }).catch(function(error){
        servicePromiseResult = error;
      });
      $rootScope.$apply();
      expect(servicePromiseResult.token).toBeUndefined();
      expect(servicePromiseResult.status).toEqual(401);
      expect(servicePromiseResult.statusText).toEqual('Unauthorized');
      expect(servicePromiseResult.data.errors.details[0].message).toEqual('Authorization Error');
    });

  });

  describe('decode', function() {
    it('should throw an error if unable to decode the Base64 string', function() {
      expect(function() {
        instance.decode('asdfg');
      }).toThrow(new Error(errorConstant.DECODE));
    });

    it('should throw an error if using an invalid token', function() {
      expect(function() {
        instance.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8');
      }).toThrow(new Error(errorConstant.DECODE));
    });
  });

  describe('isTokenExpired', function() {
    it('should accept a token param and return false if it has not expired.', function() {
      mockToken = {
        token: 'thisis.afake.token1',
        tokenExpirationActual: 1464041082
      };
      createInstance();
      var isTokenInvalid = instance.isTokenExpired(mockToken);
      expect(isTokenInvalid).toEqual(false);
    });

    it('should accept a token param and return true if it has expired.', function() {
      mockToken = {
        token: 'thisis.afake.token2',
        tokenExpirationActual: 1364041082
      };
      createInstance();
      var isTokenInvalid = instance.isTokenExpired(mockToken);
      expect(isTokenInvalid).toEqual(true);
    });

    it('should return true if the token has no expiration key.', function() {
      mockToken = {
        token: 'thisis.afake.token3'
      };
      createInstance();
      var isTokenInvalid = instance.isTokenExpired(mockToken);
      expect(isTokenInvalid).toEqual(true);
    });

    it('should return true if called without a token param.', function() {
      createInstance();
      var isTokenInvalid = instance.isTokenExpired();
      expect(isTokenInvalid).toEqual(true);
    });

  });
});
