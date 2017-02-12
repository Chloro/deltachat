module.exports = /*@ngInject*/ function(
    $location,
    $mdMedia,
    $mdSidenav,
    $rootScope,
    $scope//,
    // $state,
    // regexConstant,
    // routeConstant,
    // sessionStorageKeyConstant,
    // sessionStorageService,
    // stateConstant
) {


  // $scope.sizeIsExtraSmall = function() {
  //   return $mdMedia('xs');
  // };
  //console.log('screen size is ', $scope.sizeIsExtraSmall());

  // $scope.$on('setUserAccountTab', function() {
  //   $scope.getUserInitials();
  // });

  // $scope.getUserInitials = function() {
  //   if (sessionStorageService.get(sessionStorageKeyConstant.CURRENT_USER)) {
  //     $scope.currentUser = sessionStorageService.get(sessionStorageKeyConstant.CURRENT_USER);
  //     var initials = $scope.currentUser.displayName.match(regexConstant.NAME_INITIALS);
  //     $scope.currentUserInitials = (initials.shift() + initials.pop()).toUpperCase();
  //   }
  // };

  // $scope.isActive = function(viewLocation) {
  //   return viewLocation === $location.path();
  // };

  // $scope.onInit = function() {
  //   if ($location.path() === routeConstant.SIGN_IN) {
  //     $rootScope.showHeader = false;
  //   } else {
  //     $rootScope.showHeader = true;
  //     $scope.getUserInitials();
  //   }
  // };

  // $scope.signOut = function() {
  //   sessionStorageService.clearSession();
  //   $scope.currentUser = undefined;
  //   $state.go(stateConstant.SIGN_IN);
  // };

  $scope.toggleSideNav = function() {
    $mdSidenav('left').toggle();
    // $rootScope.showSideNav = !$rootScope.showSideNav;
    // sessionStorageService.set(sessionStorageKeyConstant.SHOW_SIDEBAR, $rootScope.showSideNav);
  };
  
  //$scope.onInit();
};
