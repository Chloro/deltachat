module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});
    plugins.util.log(plugins.util.colors.yellow('Copying fonts...'));
    gulp.src([
        config.tasks.styles.fonts.bootstrapFontSrc,
        config.tasks.styles.fonts.src,
        config.tasks.styles.fonts.fontAwesomeFontSrc
    ])
      .pipe(size)
      .pipe(gulp.dest(config.tasks.styles.fonts.dest))
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of all fonts copied: ', size.prettySize));
      })
      .pipe(plugins.browserSync.stream());
  };
};
