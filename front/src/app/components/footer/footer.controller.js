module.exports = /*@ngInject*/ function(
    $rootScope,
    $scope
) {

  $scope.applicationVersion = $rootScope.build.version;
  $scope.build = $rootScope.build.build;
  $scope.currentYear = new Date().getFullYear();

};
