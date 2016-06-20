module.exports = function(config, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Stopping mongo process...'));
    utilities.runCommand(config.tasks.stopMongo[env.env]);
  };
};
