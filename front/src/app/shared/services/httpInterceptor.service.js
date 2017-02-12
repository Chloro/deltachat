module.exports = /*@ngInject*/ function(
    $injector,
    $q,
    localeService,
    sessionStorageKeyConstant,
    sessionStorageService
) {

  function request(config) {
    var authenticationService = $injector.get('authenticationService');
    var authToken = sessionStorageService.get(sessionStorageKeyConstant.AUTH_TOKEN);

    config.headers.Accept = 'application/json, text/plain, */*';
    config.headers['Accept-Language'] = localeService.getLocale().lang;

    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken.token;
    }

    if (_.startsWith(config.url, 'http') &&
        !(_.endsWith(config.url, 'login') || _.endsWith(config.url, 'refresh-token'))) {
      authenticationService.refreshTokenIfStale();
    }

    return config;
  }

  function response(response) {
    return (response.data && response.data.messages && response.data.messages.length >= 1 && !response.data.items) ?
        $q.reject(response) : response;
  }

  return {
    request: request,
    response: response
  };
};
