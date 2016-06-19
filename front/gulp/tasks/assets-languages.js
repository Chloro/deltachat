module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});
    plugins.util.log(plugins.util.colors.yellow('Copying language files...'));
    gulp.src(config.tasks.watch.assets.languages.src)
      .pipe(size)
      .pipe(gulp.dest(config.tasks.watch.assets.languages.dest))
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of language files copied: ', size.prettySize));
      })
      .pipe(plugins.browserSync.stream());
  };
};
