module.exports = /*@ngInject*/ function(
    $resourceProvider
) {
  $resourceProvider.defaults.actions.post = {method: 'POST'};
  $resourceProvider.defaults.actions.put = {method: 'PUT'};
};
