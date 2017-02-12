module.exports = /*@ngInject*/ function(
  $sessionStorage
) {
  function deleteData(key) {
    delete $sessionStorage[key];
  }

  function getData(key) {
    return $sessionStorage[key];
  }

  function setData(key, value) {
    $sessionStorage[key] = value;
  }

  function clearSession() {
    $sessionStorage.$reset();
  }

  return {
    delete: deleteData,
    get: getData,
    set: setData,
    clearSession: clearSession
  };
};
