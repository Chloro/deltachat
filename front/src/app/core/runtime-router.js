module.exports = function () {
  return /*@ngInject*/ function runtimeStatesProvider($stateProvider, $urlRouterProvider, routeConstant) {

    this.$get = function() {
      return {
        setUpStates: function(states) {
          for (var i = 0; i < states.length; i++) {
            if (states[i].stateEnabled) {
              $stateProvider.state(states[i].stateName, states[i].stateObject);
            }
          }

          $urlRouterProvider.otherwise(routeConstant.DASHBOARD);
        }
      }
    };
  }
};
