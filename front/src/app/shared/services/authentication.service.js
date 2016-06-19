module.exports = /*@ngInject*/ function(
    $q,
    authenticationResource,
    errorConstant,
    sessionStorageService
) {

  /**
   * Function which accepts a username and password and contacts the login service. On success it will save
   * the token along with some token information into the session storage.
   *
   * @param {string} username - String containing the user's username.
   * @param {string} password - String containing the user's password.
   * @returns {promise} Returns a promise object which when resolved contains the successfully authenticated user
   * and their token, or if the promise is rejected it will contain the error.
   */
  function authenticate(username, password) {
    var result = $q.defer();
    authenticationResource.save(username, password)
        .then(function(response){
          var parts = response.authorizationToken.split('.');
          var decodedToken = JSON.parse(urlBase64Decode(parts[1]));
          var token = {
            token: response.authorizationToken,
            lifecycleExpiration: response.lifecycleExpirationDateTime,
            lifecycleExpirationActual: decodedToken.iat,
            tokenExpiration: response.tokenExpirationDateTime,
            tokenExpirationActual: decodedToken.exp
          };
          result.resolve({
            token: token,
            user: response.agentAccount
          });
          sessionStorageService.setAuthToken(token);
          sessionStorageService.setCurrentUser(response.agentAccount);
        })
        .catch(function(error){
          result.reject(error);
        });

    return result.promise;
  }

  /**
   * Function which checks the token's expiration date object against current datetime and returns true if expiration
   * date is later than current datetime.
   * 
   * @param {Object} token - Token with an expiration date.
   * @returns {Boolean} Returns true if expiration date is later than current datetime or
   * if an invalid token is provided.
   */
  function isTokenExpired(token) {
    var expirationStatus = true;
    if (token && token.tokenExpirationActual) {
      var tokenExpirationDate = new Date(token.tokenExpirationActual);
      tokenExpirationDate.setUTCSeconds(tokenExpirationDate);
      var now = new Date();
      var nowUTCDate = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
      );
      expirationStatus = tokenExpirationDate.valueOf() <= nowUTCDate.valueOf();
    }
    return expirationStatus;
  }

  /**
   * Function which takes a Base64 string and decodes it.
   *
   * @param {String} string Base64 string to be decoded
   * @returns {String} Base64 string decoded
   */
  function urlBase64Decode(string) {
    var output = string.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error(errorConstant.DECODE);
      }
    }
    return decodeURIComponent(escape(window.atob(output)));
  }

  return {
    authenticate: authenticate,
    decode: urlBase64Decode,
    isTokenExpired: isTokenExpired
  };
};
