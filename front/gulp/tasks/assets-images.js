module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});
    plugins.util.log(plugins.util.colors.yellow('Copying image assets...'));
    gulp.src(config.tasks.watch.assets.images.src)
      .pipe(size)
      .pipe(gulp.dest(config.tasks.watch.assets.images.dest))
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of all images copied: ', size.prettySize));
      })
      .pipe(plugins.browserSync.stream());
  };
};
