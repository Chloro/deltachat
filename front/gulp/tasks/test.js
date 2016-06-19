module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var files = config.tasks.test.karma.config.defaultFiles;
    files.push(config.tasks.test.src);
    plugins.util.log(plugins.util.colors.yellow('Running all unit tests...'));
    gulp.src(files)
      .pipe(plugins.karma({configFile: config.tasks.test.karma.configSrc}))
      .on('error', function(error) {
        plugins.util.log(plugins.util.colors.yellow(error.message));
        process.exit(1);
      });
  };
};
