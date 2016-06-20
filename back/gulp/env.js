var nodeEnv = require('yargs').argv.env || 'production';
var version = require('../package.json').version;

module.exports = {
  env: nodeEnv,
  isProd: 'production' === nodeEnv,
  version: version
};