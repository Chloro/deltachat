module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.browserSync.create();
    plugins.browserSync.init(config.tasks.browserSync);
  };
};
