module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Copying git hooks...'));
    gulp.src(config.tasks.hooks.src)
      .pipe(gulp.dest(config.tasks.hooks.dest));
  };
};
