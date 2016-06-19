module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    gulp.src(config.tasks.lint.jshint.files)
      .pipe(plugins.jshint())
      .pipe(plugins.jscs(config.tasks.lint.jscs))
      .pipe(plugins.jscsStylish.combineWithHintResults())
      .pipe(plugins.jshint.reporter(plugins.jshintStylish));
  };
};
