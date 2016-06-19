module.exports = /*@ngInject*/ function(
  $sessionStorage,
  sessionStorageKeyConstant
) {

  function getAuthToken() {
    return $sessionStorage[sessionStorageKeyConstant.AUTH_TOKEN];
  }

  function setAuthToken(authToken) {
    $sessionStorage[sessionStorageKeyConstant.AUTH_TOKEN] = authToken;
  }

  function deleteAuthToken() {
    delete $sessionStorage[sessionStorageKeyConstant.AUTH_TOKEN];
  }

  function getCurrentUser() {
    return $sessionStorage[sessionStorageKeyConstant.CURRENT_USER];
  }

  function setCurrentUser(user) {
    $sessionStorage[sessionStorageKeyConstant.CURRENT_USER] = user;
  }

  function deleteCurrentUser() {
    delete $sessionStorage[sessionStorageKeyConstant.CURRENT_USER];
  }

  function getTrackingId() {
    return $sessionStorage[sessionStorageKeyConstant.TRACKING_ID];
  }

  function setTrackingId(trackingId) {
    $sessionStorage[sessionStorageKeyConstant.TRACKING_ID] = trackingId;
  }

  function deleteTrackingId() {
    delete $sessionStorage[sessionStorageKeyConstant.TRACKING_ID];
  }

  function clearSession() {
    $sessionStorage.$reset();
  }

  return {
    getAuthToken: getAuthToken,
    setAuthToken: setAuthToken,
    deleteAuthToken: deleteAuthToken,
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    deleteCurrentUser: deleteCurrentUser,
    getTrackingId: getTrackingId,
    setTrackingId: setTrackingId,
    deleteTrackingId: deleteTrackingId,
    clearSession: clearSession
  };
};
