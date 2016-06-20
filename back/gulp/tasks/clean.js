module.exports = function(config, env, gulp, plugins, utilities) {
  return function() {
    plugins.del.sync(['../dist'], {force: true});
    plugins.util.log(plugins.util.colors.yellow('Cleaned the dist folder!'));
  };
};
