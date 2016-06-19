module.exports = /*@ngInject*/ function(
    $resource,
    endpointConstant
) {

  var authenticator = $resource(endpointConstant.AUTHENTICATION, {
      username: '@username',
      password: '@password'
    }
  );

  function save(username, password) {
    return authenticator.save({username: username, password: password}).$promise;
  }

  return {
    save: save
  };

};