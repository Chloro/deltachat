module.exports = /*@ngInject*/ function(
    $q,
    localeService,
    sessionStorageService,
    uuid
) {

  function request(config) {
    sessionStorageService.setTrackingId(uuid.v4()); //Move this logic to successful login when login is added.
    var authToken = sessionStorageService.getAuthToken();
    var trackingID = sessionStorageService.getTrackingId();
    config.headers.Accept = 'application/json, text/plain, */*';
    config.headers['X-ChoiceEdge-Requestor'] = 'EDGE_UI';
    config.headers['Accept-Language'] = localeService.getLocale().lang;

    var url = config.url.split('/');
    if (config.method === 'POST' && _.includes(url, 'agent-account') && _.includes(url, 'login')) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }

    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
    }

    if (trackingID) {
      config.headers['X-ChoiceEdge-TrackingId'] = trackingID;
    }

    return config;
  }

  return {
    request: request
  };
};
