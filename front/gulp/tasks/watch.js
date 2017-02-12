module.exports = function(config, constants, env, gulp, plugins, utilities) {
  function changeDetected(file) {
    plugins.util.log(plugins.util.colors.yellow('Change detected in file: ' + file.path));
  }

  return function() {
    gulp.watch(config.tasks.watch.less, ['styles']).on('change', changeDetected);
    plugins.util.log(plugins.util.colors.yellow('Watching less files...'));
    gulp.watch(config.tasks.watch.assets.languages.src, ['assets-languages']).on('change', changeDetected);
    plugins.util.log(plugins.util.colors.yellow('Watching language assets...'));
    gulp.watch(config.tasks.watch.assets.images.src, ['assets-images']).on('change', changeDetected);
    plugins.util.log(plugins.util.colors.yellow('Watching image assets...'));
    plugins.util.log(plugins.util.colors.yellow('Watching spec files...'));
    gulp.watch(config.tasks.watch.test, function(file) {
      plugins.util.log(plugins.util.colors.yellow('Change detected in file: ' + file.path + ' running it\'s tests...'));
      var files = config.tasks.test.karma.config.defaultFiles;
      files.push(file.path);
      gulp.src(files)
        .pipe(plugins.karma({configFile: config.tasks.test.karma.configSrc}))
        .on('error', function(error) {
          plugins.util.log(plugins.util.colors.yellow(error.message));
        });
    });
  };
};
