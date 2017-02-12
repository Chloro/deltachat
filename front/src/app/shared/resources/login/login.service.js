module.exports = /*@ngInject*/ function(
    $rootScope,
    loginResource
) {
  return {
    post: function(params) {
      return loginResource[$rootScope.endpoints.name].post(params).$promise;
    }
  };
};
