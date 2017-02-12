module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function(done) {
    plugins.webpack(config.tasks.webpack, function (error, stats) {
      if (error) {
        throw new plugins.util.PluginError('[Webpack Bundle Error]', error);
      }
      plugins.util.log(plugins.util.colors.green('[Webpack Bundle Complete]\n') + stats.toString({
          assets: true,
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: false,
          timings: false,
          version: false
        }));
    });
    done();
  };
};
