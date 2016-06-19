var controller = require('./sign-in.controller.js');
var routeConstant = require('../../shared/constants/route.constant');

describe('signInController', function () {
  var $location;
  var $q;
  var $rootScope;
  var $scope;
  var authenticationService;
  var instance;
  var sessionStorageService;

  function createInstance() {
    instance = controller(
        $location,
        $scope,
        authenticationService,
        routeConstant,
        sessionStorageService
    );
  }

  beforeEach(angular.mock.inject(function ($injector) {
    $location = $injector.get('$location');
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    authenticationService = {
      authenticate: function(){
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      }
    };

    sessionStorageService = {
      deleteAuthToken: function(){},
      deleteCurrentUser: function(){}
    };

    spyOn($location, 'path');
    spyOn(authenticationService, 'authenticate').and.callThrough();
    spyOn(sessionStorageService, 'deleteAuthToken').and.callThrough();
    spyOn(sessionStorageService, 'deleteCurrentUser').and.callThrough();

    createInstance();
  }));

  describe('signInController', function() {
    describe('on init', function() {
      it('should delete the current token and user from session', function() {
        expect(sessionStorageService.deleteAuthToken).toHaveBeenCalled();
        expect(sessionStorageService.deleteCurrentUser).toHaveBeenCalled();
      });
    });

    describe('on service success', function() {
      it('should change location to routeConstant.OPERATIONS and remove any scope authentication errors', function() {
        $scope.login({username: 'testname', password: 'testpass'});
        $rootScope.$apply();
        expect($location.path).toHaveBeenCalledWith(routeConstant.OPERATIONS);
        expect($scope.authenticationError).toBeUndefined();
      });
    });

    it('should not attempt to login until a username and password are provided.', function() {
      $scope.login({username: undefined, password: undefined});
      $rootScope.$apply();
      expect($location.path.calls.any()).toEqual(false);
      expect($scope.authenticationError).toBeUndefined();
    });

    describe('on service error', function() {
      it('should set scope authentication errors based on service error and not change location', function() {
        authenticationService = {
          authenticate: function(){
            var deferred = $q.defer();
            deferred.reject({
              statusText: 'display error'
            });
            return deferred.promise;
          }
        };
        createInstance();
        $scope.login({username: 'testname', password: 'testpass'});
        $rootScope.$apply();
        expect($location.path.calls.any()).toEqual(false);
        expect($scope.authenticationError).toEqual('ERROR: display error');
      });
    });
  });
});
