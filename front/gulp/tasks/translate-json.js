module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Starting JSON Translations...'));
    plugins.jsonTranslate(config.tasks.translate);
  };
};
