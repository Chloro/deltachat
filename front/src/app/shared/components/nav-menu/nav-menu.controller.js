module.exports = /*@ngInject*/ function(
    $scope,
    $state,
    sessionStorageKeyConstant,
    sessionStorageService,
    stateConstant
) {
  
  // $scope.states = stateConstant;
  //
  // $scope.goToHotelRequiredPage = function(toState) {
  //   var hotel = sessionStorageService.get(sessionStorageKeyConstant.CURRENT_HOTEL);
  //   var hotelCode = hotel ? hotel.hotelCode : '';
  //
  //   $state.go(toState, {hotelCode: hotelCode});
  // };
  //
  // $scope.isActive = function (linkState) {
  //   return  $state.current.name.indexOf(linkState) === 0;
  // };
  //
  // $scope.openCurrentMenu = function() {
  //   $scope[sessionStorageService.get(sessionStorageKeyConstant.CURRENT_MENU_STATE)] = true;
  // };
  //
  // $scope.setMenuState = function(menuState) {
  //   sessionStorageService.set(sessionStorageKeyConstant.CURRENT_MENU_STATE, menuState);
  // };

};
