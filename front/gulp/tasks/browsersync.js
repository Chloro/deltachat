module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.browserSync(config.tasks.browsersync);
  };
};
