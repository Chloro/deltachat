module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    var watching = false;
    var bundler = plugins.watchify(plugins.browserify(config.tasks.browserify));
    bundle();
    watching = true;
    bundler.on('update', bundle);
    plugins.util.log(plugins.util.colors.yellow('Watchify is watching javascript files...'));

    function bundle() {
      if (watching) {
        plugins.util.log(plugins.util.colors.yellow('Watchify has detected a javascript change, re-bundling...'));
      } else {
        plugins.util.log(plugins.util.colors.yellow('Bundling javascript...'));
      }
      bundler.bundle()
        .on('error', function(error) {
          if (process.env.WATCHING) {
            plugins.util.log(plugins.util.colors.red('Re-bundling failed. Cause: ' + error));
          } else {
            plugins.util.log(plugins.util.colors.red('Bundling failed. Cause: ' + error));
          }
        })
        .pipe(plugins.source('bundle.js'))
        .pipe(plugins.ngannotate(config.tasks.ngannotate))
        .pipe(plugins.if(env.sourceMaps, plugins.streamify(plugins.sourcemaps.init({loadMaps: true}))))
        .pipe(plugins.if(env.minify, plugins.streamify(plugins.uglify(config.tasks.uglify))))
        .pipe(plugins.if(env.sourceMaps, plugins.streamify(plugins.sourcemaps.write())))
        .pipe(plugins.rename(config.app.name))
        .pipe(gulp.dest(config.paths.dest))
        .on('end', function() {
          var size = utilities.getFilesize(config.paths.dest + '/' + config.app.name);
          plugins.util.log(plugins.util.colors.blue('Total size of javascript bundle: ', size));
        })
        .pipe(plugins.browserSync.stream());
    }
  };
};

