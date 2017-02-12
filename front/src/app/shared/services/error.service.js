module.exports = /*@ngInject*/ function(
    $rootScope,
    errorConstant
) {

  function createError(message, code, type) {
    return {
      errors: {
        details: [{
          code: code || 'APPLICATION_ERROR',
          message: message || errorConstant.UNKNOWN,
          service: 'client-application',
          type: type || 'APPLICATION',
          version: $rootScope.build.version
        }]
      }
    };
  }

  return {
    createError: createError
  };
};
