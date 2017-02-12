module.exports = /*@ngInject*/ function (
  $rootScope,
  bundleResolverProviderService,
  keyConstant,
  routeConstant,
  stateConstant
) {

  function getStates() {
    return [
      {
        stateEnabled: true,
        stateName: stateConstant.DASHBOARD,
        stateObject: {
          authenticate: false,
          url: routeConstant.DASHBOARD,
          views: {
            main: {
              controller: 'dashboardController',
              resolve: {
                bundles: bundleResolverProviderService.selectScriptBundleResolver(keyConstant.DASHBOARD)
              },
              templateProvider: /*@ngInject*/ function($templateCache) {
                return bundleResolverProviderService.selectTemplateBundleCacher(keyConstant.DASHBOARD)()
                    .then(function() {
                      return $templateCache.get('/pages/dashboard/dashboard.html');
                    });
              }
            }
          }
        }
      },
      {
        stateEnabled: true,
        stateName: stateConstant.LOGIN,
        stateObject: {
          authenticate: false,
          url: routeConstant.LOGIN,
          views: {
            main: {
              controller: 'loginController',
              resolve: {
                bundles: bundleResolverProviderService.selectScriptBundleResolver(keyConstant.LOGIN)
              },
              templateProvider: /*@ngInject*/ function($templateCache) {
                return bundleResolverProviderService.selectTemplateBundleCacher(keyConstant.LOGIN)()
                    .then(function() {
                      return $templateCache.get('/pages/login/login.html');
                    });
              }
            }
          }
        }
      }
    ];
  }

  return {
    getStates: getStates
  }

};
