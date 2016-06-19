var service = require('./sessionStorage.service.js');

describe('sessionStorageService.', function() {
  var $sessionStorage;
  var instance;
  var sessionStorageKeyConstant;

  function createInstance() {
    instance = service(
        $sessionStorage,
        sessionStorageKeyConstant
    );
  }

  beforeEach(function() {
    $sessionStorage = {$reset: function(){}};
    sessionStorageKeyConstant = require('../constants/sessionStorageKey.constant');
    spyOn($sessionStorage, '$reset');
    createInstance();
  });

  describe('authToken', function() {
    it('should save the authToken to session storage when setAuthToken() is called.', function() {
      instance.setAuthToken({test: 'test'});
      var result = instance.getAuthToken();
      expect(result).toBeDefined();
    });

    it('should get the authToken from session storage when getAuthToken() is called.', function() {
      instance.setAuthToken({test2: 'test2'});
      var result = instance.getAuthToken();
      expect(result).toEqual({test2: 'test2'});
    });

    it('should delete the authToken from session storage when deleteAuthToken() is called.', function() {
      instance.setAuthToken({test3: 'test3'});
      var result = instance.getAuthToken();
      expect(result).toEqual({test3: 'test3'});
      instance.deleteAuthToken();
      var result2 = instance.getAuthToken();
      expect(result2).toBeUndefined();
    });
  });

  describe('currentUser', function() {
    it('should save the currentUser to session storage when setCurrentUser() is called.', function() {
      instance.setCurrentUser({test4: 'test4'});
      var result = instance.getCurrentUser();
      expect(result).toBeDefined();
    });

    it('should get the authToken from session storage when getAuthToken() is called.', function() {
      instance.setCurrentUser({test5: 'test5'});
      var result = instance.getCurrentUser();
      expect(result).toEqual({test5: 'test5'});
    });

    it('should delete the authToken from session storage when deleteCurrentUser() is called.', function() {
      instance.setCurrentUser({test6: 'test6'});
      var result = instance.getCurrentUser();
      expect(result).toEqual({test6: 'test6'});
      instance.deleteCurrentUser();
      var result2 = instance.getCurrentUser();
      expect(result2).toBeUndefined();
    });
  });

  describe('trackingId', function() {
    it('should save the trackingId to session storage when setTrackingId() is called.', function() {
      instance.setTrackingId({test7: 'test7'});
      var result = instance.getTrackingId();
      expect(result).toBeDefined();
    });

    it('should get the trackingId from session storage when getTrackingId() is called.', function() {
      instance.setTrackingId({test8: 'test8'});
      var result = instance.getTrackingId();
      expect(result).toEqual({test8: 'test8'});
    });

    it('should delete the trackingId from session storage when deleteTrackingId() is called.', function() {
      instance.setTrackingId({test9: 'test9'});
      var result = instance.getTrackingId();
      expect(result).toEqual({test9: 'test9'});
      instance.deleteTrackingId();
      var result2 = instance.getTrackingId();
      expect(result2).toBeUndefined();
    });
  });

  describe('clearSession', function() {
    it('should call the $sessionStorage.reset function.', function() {
      instance.setAuthToken({test10: 'test10'});
      instance.clearSession();
      expect($sessionStorage.$reset).toHaveBeenCalled();
    });
  });

});
