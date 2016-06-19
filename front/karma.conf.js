var karamaConfig = require('./gulp/config').tasks.test.karma.config;

module.exports = function(config) {
  karamaConfig['logLevel'] = config.LOG_ERROR;
  config.set(karamaConfig)
};
