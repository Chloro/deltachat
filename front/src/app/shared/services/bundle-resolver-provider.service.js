/* istanbul ignore next */
module.exports = /*@ngInject*/ function(
    $ocLazyLoad,
    $q,
    $templateCache
) {

  /* istanbul ignore next */
  function registerTemplatesInCache(templates) {
    templates.forEach(function(template) {
      $templateCache.put(template.key, template.html);
    });
  }

  /* istanbul ignore next */
  function selectTemplateBundleCacher(bundleName) {
    return {
      DASHBOARD: function(){
        var deferred = $q.defer();
        require.ensure(['../../bundles/templates/dashboard.templates.bundle'], function() {
          var templates = require('../../bundles/templates/dashboard.templates.bundle.js');
          deferred.resolve(registerTemplatesInCache(templates));
        }, 'dashboard.templates');

        return deferred.promise;
      },
      LOGIN: function() {
        var deferred = $q.defer();
        require.ensure(['../../bundles/templates/login.templates.bundle'], function() {
          var templates = require('../../bundles/templates/login.templates.bundle.js');
          deferred.resolve(registerTemplatesInCache(templates));
        }, 'login.templates');

        return deferred.promise;
      }
    }[bundleName];
  }

  /* istanbul ignore next */
  function selectScriptBundleResolver(bundleName) {
    return {
      DASHBOARD: function(){
        var deferred = $q.defer();
        require.ensure(['../../bundles/scripts/dashboard.scripts.bundle'], function() {
          var module = require('../../bundles/scripts/dashboard.scripts.bundle.js');
          $ocLazyLoad.load({name: 'deltachat-ui.bundle.dashboard'});
          deferred.resolve(module);
        }, 'dashboard.scripts');

        return deferred.promise;
      },
      LOGIN: function(){
        var deferred = $q.defer();
        require.ensure(['../../bundles/scripts/login.scripts.bundle'], function() {
          var module = require('../../bundles/scripts/login.scripts.bundle.js');
          $ocLazyLoad.load({name: 'deltachat-ui.bundle.login'});
          deferred.resolve(module);
        }, 'login.scripts');

        return deferred.promise;
      }
    }[bundleName];
  }

  return {
    selectScriptBundleResolver: selectScriptBundleResolver,
    selectTemplateBundleCacher: selectTemplateBundleCacher
  };

};
