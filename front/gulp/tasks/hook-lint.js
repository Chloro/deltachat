var map = require('map-stream');
module.exports = function(config, constants, env, gulp, plugins, utilities) {

  return function() {
    plugins.util.log(plugins.util.colors.yellow('Linting before your commit...'));
    var errorReporter = function() {
      return map(function(file, cb) {
        if (!file.jshint.success) {
          plugins.util.log(plugins.util.colors.red('Linting failed. Commit aborted!'));
          process.exit(1);
        }
        cb(null, file);
      });
    };

    gulp.src(config.tasks.lint.jshint.files)
      .pipe(plugins.jshint())
      .pipe(plugins.jscs(config.tasks.lint.jscs))
      .pipe(plugins.jscsStylish.combineWithHintResults())
      .pipe(plugins.jshint.reporter(plugins.jshintStylish))
      .pipe(errorReporter());
  };
};
