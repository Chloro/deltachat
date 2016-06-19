module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Bundling javascript...'));
    plugins.browserify(config.tasks.browserify)
      .bundle()
      .on('error', function(error) {
        plugins.util.log(plugins.util.colors.red('Bundling failed. Cause: ' + error));
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
      });
  };
};
