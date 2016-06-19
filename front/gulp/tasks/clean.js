module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {
    plugins.del.sync(['./dist']);
    plugins.util.log(plugins.util.colors.yellow('Cleaned the dist folder!'));
  };
};
