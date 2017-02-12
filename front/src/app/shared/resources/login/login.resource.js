module.exports = /*@ngInject*/ function(
    $resource,
    endpointConstant
) {

  return $resource(endpointConstant.login, {
      username: '@username',
      password: '@password'
  })
};