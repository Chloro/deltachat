module.exports = function(config, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Starting mongo process...'));
    utilities.runCommand(config.tasks.startMongo[env.env]);
  };
};
