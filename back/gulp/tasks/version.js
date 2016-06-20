var fs = require('fs');

module.exports = function(config, env, gulp, plugins, utilities) {
  return function() {
    var build = env.env;
    var version = env.version;

    fs.writeFileSync(
        config.tasks.version.dest,
        [
          'module.exports = {',
          '  build: \'' + build + '\',',
          '  version: \'' + version + '\'',
          '};',
          ''
        ].join('\n')
    );
  };
};
