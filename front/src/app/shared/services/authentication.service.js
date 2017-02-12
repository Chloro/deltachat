module.exports = /*@ngInject*/ function(
    $q,
    errorConstant,
    errorService,
    loginService,
    sessionStorageKeyConstant,
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
    var params = {
      username: username,
      password: password
    };

    var result = $q.defer();
    loginService.post(params)
        .then(function(response) {
          var enrichedToken = transformToken(response);
          response.userAccount.username = username;
          result.resolve({
            token: enrichedToken,
            user: response.userAccount
          });

          sessionStorageService.set(sessionStorageKeyConstant.AUTH_TOKEN, enrichedToken);
          sessionStorageService.set(sessionStorageKeyConstant.CURRENT_USER, response.userAccount);
          sessionStorageService.set(sessionStorageKeyConstant.ORGANIZATION_CODE, 'EC');
        })
        .catch(function(error) {
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
      var now = new Date();
      expirationStatus = token.tokenExpirationActual * 1000 <= now.valueOf();
    }
    return expirationStatus;
  }

  /**
   * Function checks a token to see if it is stale. Stale is defined as expiring within the next 5 minutes.
   *
   * @param {Object} token - Token with an expiration date.
   * @returns {promise} Returns a promise object which when resolved contains the successfully refreshed token
   * or if the promise is rejected it will contain the service error or a custom error if the token has already
   * expired, it isn't stale, or if there is no token in session at all.
   */
  function isTokenStale(token) {
    var isStale = false;
    if (token && token.tokenExpirationActual) {
      var now = new Date();
      var timeRemaining = token.tokenExpirationActual * 1000 - now.valueOf();
      isStale = timeRemaining >= 0 && timeRemaining < 300000;
    }
    return isStale;
  }

  /**
   * Function checks the current session token to see if it is stale, and if it is the token will be refreshed.
   *
   * @returns {promise} Returns a promise object which when resolved contains the successfully refreshed token
   * or if the promise is rejected it will contain the service error or a custom error if the token has already
   * expired, it isn't stale, or if there is no token in session at all.
   */
  function refreshTokenIfStale() {
    var authToken = sessionStorageService.get(sessionStorageKeyConstant.AUTH_TOKEN);
    var isExpired = isTokenExpired(authToken);
    var isStale = isTokenStale(authToken);
    var result = $q.defer();
    if (authToken && !isExpired && isStale) {
      result.resolve(refreshToken());
    } else {
      result.reject(errorService.createError(errorConstant.REFRESH));
    }
    return result.promise;
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
        throw new Error(errorService.createError(errorConstant.DECODE));
      }
    }
    return decodeURIComponent(escape(window.atob(output)));
  }

  function transformToken(token) {
    var parts = token.authenticationToken.split('.');
    var decodedToken = JSON.parse(urlBase64Decode(parts[1]));
    return {
      token: token.authenticationToken,
      lifecycleExpiration: token.lifecycleExpirationDateTime,
      lifecycleExpirationActual: decodedToken.iat,
      tokenExpiration: token.tokenExpirationDateTime,
      tokenExpirationActual: decodedToken.exp
    };
  }

  return {
    authenticate: authenticate,
    decode: urlBase64Decode,
    isTokenExpired: isTokenExpired,
    isTokenStale: isTokenStale,
    refreshTokenIfStale: refreshTokenIfStale,
    transformToken: transformToken
  };
};
