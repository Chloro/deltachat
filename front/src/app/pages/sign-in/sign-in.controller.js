module.exports = /*@ngInject*/ function(
    $location,
    $scope,
    authenticationService,
    routeConstant,
    sessionStorageService
) {

  sessionStorageService.deleteAuthToken();
  sessionStorageService.deleteCurrentUser();

  $scope.login = function(user) {
    if (user && user.username && user.password) {
      authenticationService.authenticate(user.username, user.password)
          .then(function() {
            $location.path(routeConstant.OPERATIONS);
            $scope.authenticationError = undefined;
          })
          .catch(function(error) {
            $scope.authenticationError = 'ERROR: ' + error.statusText;
          });
    }
  };

};
