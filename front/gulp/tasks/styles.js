module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var size = plugins.size({showTotal: false});
    plugins.util.log(plugins.util.colors.yellow('Compiling less...'));
    gulp.src(config.tasks.styles.less.src)
      .pipe(plugins.if(env.sourceMaps, plugins.sourcemaps.init({loadMaps: true})))
      .pipe(plugins.less())
      .on('error', function(error) {
        plugins.util.log(plugins.util.colors.red('Less compilation failed. Cause: ' + error));
      })
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
      }))
      .pipe(plugins.rename(config.tasks.styles.less.name))
      .pipe(plugins.cleancss({compatibility: 'ie10'}))
      .pipe(plugins.if(env.sourceMaps, plugins.sourcemaps.write()))
      .pipe(size)
      .on('end', function() {
        plugins.util.log(plugins.util.colors.blue('Total size of compiled less: ', size.prettySize));
      })
      .pipe(gulp.dest(config.paths.dest))
      .pipe(plugins.browserSync.stream());
  };
};
