module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});

    plugins.util.log(plugins.util.colors.yellow('Starting less stream...'));
    var lessStream = gulp.src(config.tasks.styles.less.src)
      .pipe(plugins.less())
      .pipe(plugins.concat('temp-less.less'));

    plugins.util.log(plugins.util.colors.yellow('Starting sass stream...'));
    var sassStream = gulp.src(config.tasks.styles.sass.src)
      .pipe(plugins.sass())
      .pipe(plugins.concat('temp-sass.scss'));

    plugins.util.log(plugins.util.colors.yellow('Merging sass and less streams...'));
    plugins.mergeStream(lessStream, sassStream)
      .pipe(plugins.concat(config.tasks.styles.merge.name))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
      }))
      .pipe(plugins.cleancss({compatibility: 'ie10'}))
      .pipe(gulp.dest(config.paths.dest))
      .pipe(size)
      .on('error', function(error) {
        plugins.util.log(plugins.util.colors.red('Stream merge failed. Cause: ' + error));
      })
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of sass/less stream output: ', size.prettySize));
      })
      .pipe(plugins.browserSync.stream());
  };
};
