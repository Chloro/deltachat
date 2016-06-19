var service = require('./alert-modal.service.js');

describe('alert-modal.service', function() {
  var $uibModal;
  var alertMessages;
  var alertType;
  var instance;
  var isBlocking;
  var timeout;

  function createInstance() {
    instance = service(
      $uibModal
    );
  }

  beforeEach(function() {
    $uibModal = {
      open: function(){}
    };
    spyOn($uibModal, 'open');
    createInstance();
  });

  describe('openAlertModal', function() {
    it('should call $uibModal.open with the correct config.', function() {
      instance.openAlertModal(alertMessages, alertType, isBlocking, timeout);
      var options = $uibModal.open.calls.argsFor(0)[0];
      expect(options.backdrop).toEqual(true);
      expect(options.backdropClass).toEqual('hide-modal-backdrop');
      expect(options.controller).toEqual('alertModalController');
      expect(options.keyboard).toEqual(true);
      expect(options.templateUrl).toEqual('/shared/components/alert-modal/alert-modal.html');
      expect(options.size).toEqual('md');
      expect(options.resolve.alertMessages).toBeDefined();
      expect(options.resolve.alertType).toBeDefined();
      expect(options.resolve.duration).toBeDefined();
    });

    it('should call $uibModal.open with the correct config when nonblocking param is passed.', function() {
      isBlocking = true;
      instance.openAlertModal(alertMessages, alertType, isBlocking, timeout);
      var options = $uibModal.open.calls.argsFor(0)[0];
      expect(options.backdrop).toEqual('static');
      expect(options.backdropClass).toEqual('');
      expect(options.controller).toEqual('alertModalController');
      expect(options.keyboard).toEqual(false);
      expect(options.templateUrl).toEqual('/shared/components/alert-modal/alert-modal.html');
      expect(options.size).toEqual('md');
      expect(options.resolve.alertMessages).toBeDefined();
      expect(options.resolve.alertType).toBeDefined();
      expect(options.resolve.duration).toBeDefined();
    });


    describe('alertMessages resolver', function() {
      it('should resolve the alert messages array based on the passed param(s), accepting a single string', function() {
        instance.openAlertModal('test message');
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.alertMessages()).toEqual(['test message']);
      });

      it('should resolve the alert messages array based on the passed param(s), accepting an array of messages', function() {
        instance.openAlertModal(['test message', 'test message2']);
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.alertMessages()).toEqual(['test message', 'test message2']);
      });
    });

    describe('alertType resolver', function() {
      it('should resolve the alertType based on passed param', function() {
        instance.openAlertModal('test message', 'testclass');
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.alertType()).toEqual('testclass');
      });

      it('should resolve a warning class if none are provided', function() {
        instance.openAlertModal('test message');
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.alertType()).toEqual('warning');
      });
    });

    describe('timeout resolver', function() {
      it('should resolve the timeout to the pass param.', function() {
        instance.openAlertModal('test message', 'testclass', true, 2000);
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.duration()).toEqual(2000);
      });

      it('should resolve the timeout to undefined if not passed as a param', function() {
        instance.openAlertModal('test message', 'testclass', true);
        var options = $uibModal.open.calls.argsFor(0)[0];
        expect(options.resolve.duration()).toEqual(undefined);
      });
    });

  });
});
