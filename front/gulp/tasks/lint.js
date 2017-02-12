module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    // check file encoding
    gulp.src(config.tasks.lint.utf8.files)
        .pipe(utilities.checkEncoding(plugins))
        .pipe(gulp.dest('./'))
        .on('end', function() {
          if (utilities.isReadyToLint()) {
            // lint
            gulp.src(config.tasks.lint.jshint.files)
                .pipe(plugins.jshint())
                .pipe(plugins.jscs(config.tasks.lint.jscs))
                .pipe(plugins.jscsStylish.combineWithHintResults())
                .pipe(plugins.jshint.reporter(plugins.jshintStylish));
          }
        });
  };
};
