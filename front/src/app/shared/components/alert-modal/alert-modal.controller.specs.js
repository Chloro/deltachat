var controller = require('./alert-modal.controller.js');

describe('alert-modal.controller.js', function() {
  var $rootScope;
  var $scope;
  var $timeout;
  var $uibModalInstance;
  var alertMessages;
  var alertType;
  var instance;
  var duration;

  function createInstance() {
    instance = controller(
        $timeout,
        $scope,
        $uibModalInstance,
        alertMessages,
        alertType,
        duration
    );
  }

  beforeEach(angular.mock.inject(function ($injector) {
    $uibModalInstance = {
      close: function(){}
    };
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');
    alertType = 'warning';
    alertMessages = ['test message1', 'test message2'];

    spyOn($uibModalInstance, 'close').and.callThrough();
    $uibModalInstance.close.calls.reset();
    createInstance();
  }));

  describe('on init', function () {
    it('should set alert messages to scope.', function () {
      expect($scope.alertMessages).toEqual(['test message1', 'test message2']);
    });

    it('should set alertType to scope.', function () {
      expect($scope.alertType).toEqual('warning');
    });

    it('should not close the modal if the controller was not passed a timeout duration', function () {
      duration = undefined;
      createInstance();
      $timeout.flush(1001);
      expect($uibModalInstance.close.calls.any()).toEqual(false);
    });

    it('should close the modal if the controller was passed a timeout duration', function () {
      duration = 500;
      createInstance();
      $timeout.flush(1001);
      expect($uibModalInstance.close).toHaveBeenCalled();
    });

  });

  describe('scope.modal.close', function () {
    it('should call $uibModalInstance.close', function () {
      $scope.modal.close();
      expect($uibModalInstance.close).toHaveBeenCalled();
    });
  });

});
