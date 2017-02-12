module.exports = /*@ngInject*/ function(
  $localStorage
) {

  function clearLocalStorage() {
    $localStorage.$reset();
  }
  
  function deleteData(key) {
    delete $localStorage[key]
  }
  
  function get(key) {
    return $localStorage[key];
  }
  
  function set(key, value) {
    $localStorage[key] = value;
  }

  return {
    clearLocalStorage: clearLocalStorage,
    delete: deleteData,
    get: get,
    set: set
  };
};
