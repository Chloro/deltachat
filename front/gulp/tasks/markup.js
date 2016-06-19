module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});
    plugins.util.log(plugins.util.colors.yellow('Copying templates...'));
    gulp.src([config.app.templates], {cwd: config.paths.root})
      .pipe(size)
      .pipe(gulp.dest(config.app.dest), {cwd: config.paths.root})
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of all templates copied: ', size.prettySize));
      })
      .pipe(plugins.browserSync.stream());
  };
};
